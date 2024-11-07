import express,{Request, Response, NextFunction} from "express"


const app = express()
app.use(express.json());

app.use(express.json()); // Process incoming JSON
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`Received request ${req.url} at ${new Date()}`)
  next()
})


 interface Products {
    id: number,
    productName: string,
    productDescription: string,
    productPrice : number
  }
  
 interface ProductRequestBody {
    productName: string;
    productDescription: string;
    productPrice: number;
  }



let products: Products[]=[]

app.get("/products",(req,res)=>{
    if(products.length ===0){
        res.status(200).send("<h1>The list it's empty</h1>")
    }
    res.status(200).json(products)
})

 app.get('/products/:id',(req:Request<{id:string}>, res:Response)=>{
    const{id}= req.params
    const product = products.find(item=>item.id.toString()=== id)
    if(product){
        res.json(product)
    }else{
        res.status(404).send("<h2>Product doesn't exist<h2/>")
    }
 })

app.post('/products',(req:Request<{}>,res:Response)=>{
    const product: Products={
        id:req.body.id,
        productName: req.body.productName,
        productDescription : req.body.productDescription,
        productPrice: req.body.productPrice
    
    }
    products.push(product)
    res.status(201).json(product) 
})

app.put("/products/id",(req:Request<{id:string},{},ProductRequestBody>,res:Response)=>{
    const {id}=req.params
    const foundIndex= products.findIndex(index => index.id.toString() === id)
    if(foundIndex !== -1){
        const updateProduct: Products={
            ...products[foundIndex],
            productName: req.body.productName,
            productDescription:req.body.productDescription,
            productPrice:req.body.productPrice
        }
        products[foundIndex]=updateProduct
        res.json(products)
    } else{
        res.status(404).send("TOdo doesn't exist")
    }
    app.delete("/products/id",(req:Request<{id:string}>,res:Response)=>{
        const {id}=req.params
        const foundIndex= products.findIndex(product=>product.id.toString()===id)
        if(foundIndex !== -1){
            products = products.filter(product=>product.id.toString()!==id)
            res.status(200).send("Product was deleted")
        }else{
            res.status(404).send("Product doesn't exist")
        }
    })

    })

    

const PORT = 4000
 app.listen(PORT,()=>{
  console.log('Server Started')
 })