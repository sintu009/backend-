import App from "../model/AppModel.js";

export const getStats = async (req, res) => {
  try {
    const { month } = req.params;
    const selectedMonthNumber = parseInt(month);
    const totalSaleAmount = await App.aggregate([
      {
        $match: {
          $expr: {
            $eq: [{ $month: '$dateOfSale' }, selectedMonthNumber],
          },
        },
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$price" },
        },
      },
    ]);
    const totalSoldItems = totalSaleAmount.length

    const totalNotSoldItems = totalSaleAmount.length

    res.status(200).json({
      totalSaleAmount: totalSaleAmount[0]?.totalAmount || 0,
      totalSoldItems,
      totalNotSoldItems,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
