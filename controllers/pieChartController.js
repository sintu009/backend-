import App from "../model/AppModel.js";

export const getPieChart = async (req, res) => {
  try {
    const selectedMonthNumber = parseInt(req.params.month);

    const items = await App.aggregate([
      {
        $match: {
          $expr: {
            $eq: [{ $month: '$dateOfSale' }, selectedMonthNumber],
          },
        },
      },
    ]);

    const categoryCounts = {};

    items.forEach((item) => {
      const category = item.category;
      if (categoryCounts[category]) {
        categoryCounts[category]++;
      } else {
        categoryCounts[category] = 1;
      }
    });

    res.status(200).json(categoryCounts);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
