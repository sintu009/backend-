import App from "../model/AppModel.js";

export const getAllData = async (req, res) => {
  try {
    const selectedMonth = parseInt(req.params.month, 10);

    let transactions = await App.aggregate([
      {
        $match: {
          $expr: {
            $eq: [{ $month: '$dateOfSale' }, selectedMonth],
          },
        },
      },
    ]);

    // console.log(await transactions);

    res.status(200).json({
      transactions, selectedMonth
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
