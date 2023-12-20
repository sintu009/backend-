import App from '../model/AppModel.js'

export const getPopulate = async (req, res) => {
  try {
    const response = await fetch(
      "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
    );
    const Data = await response.json();

    const itemsToInsert = Data.map((item) => {
      const saleDate = new Date(item.dateOfSale);
      return {
        ...item,
        month: saleDate.getMonth() + 1,
      };
    });

    await App.insertMany(itemsToInsert);
    // console.log(Data)

    res.status(200).json({ message: "Data populated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}