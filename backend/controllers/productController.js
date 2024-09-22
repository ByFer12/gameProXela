const productModel = require('../models/productModel');

exports.moveProductToBodega = async (req, res) => {
    console.log("Quiero ver la sesioooooon: "+req.session.sucursal_id+" El id del usuario es: "+req.session.userId)
    const id_sucursal=req.session.sucursal_id;
    const id_bodega=req.session.sucursal_id;
    const id_empleado=req.session.userId;

    const { id_producto, cantidad } = req.body;
    try {
        const producto = await productModel.addProductBodega(id_sucursal, id_producto, id_empleado, cantidad, id_bodega);
        res.status(201).json({ message: "Producto agregado a bodega", product: producto });
    } catch (error) {
        console.log("ERROR CONTROLADOR PRODUCTO: "+error.message);
        res.status(500).json({ message: "error al agregar el producto a bodega" });
    }
}
exports.moverProdBodegaToPasillo =async(req,res)=>{
    console.log("Quiero ver la sesioooooon mover de bodega a pasillo: "+req.session.sucursal_id+" El id del usuario es: "+req.session.userId);
    const id_sucursal=req.session.sucursal_id;
    const id_empleado=req.session.userId;

    const { id_producto, cantidad, pasillo, } = req.body;
    try {
            const product=await productModel.addProdBodegaToPassillo(id_sucursal, id_producto, cantidad, pasillo, id_empleado);
            res.status(201).json({message:"Producto agregado a pasillo",producto:product});
    } catch (error) {
        console.log("error al mover a pasillo: "+error.message);
        res.status(500).json({ message: "error al agregar el producto a pasillo" });
    }


}

//obtener productos existentes en stock
exports.obtenerProductos=async(req,res)=>{
    try {
        const productos= await productModel.obtenerProductosStock();
        res.status(200).json({productos});
    } catch (error) {
        console.log("No cargan productos: "+error.message);

        res.status(500).json({ message:"No se pudieron cargar los productos"});
        
    }

}
//obtengo los productos sin detalles
exports.getAllProducts = async (req, res) => {
    try {
      const products = await productModel.getAllProducts();
      res.status(200).json(products);
    } catch (error) {
        console.log("No cargan productos: "+error.message);
      res.status(500).json({ message:"No se pudieron cargar los prod"});
    }
  };

  //obtengo productos con deetalles
  exports.getAllProducts = async (req, res) => {
    try {
      const products = await productModel.getAllProductsDetails();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({message:"No se pudieron cargar los productos"});
    }
  };