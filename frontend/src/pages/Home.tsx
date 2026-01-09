import { Box, Container } from "@mui/material"
import ProductCard from "../components/ProductCard"
import { useEffect, useState } from "react"
import type {Product} from "../types/Product"

const HomePage = () => {
    const [products, setProducts] = useState<Product[]>([]);

    // useEffect(() => {
    //     fetch("http://localhost:3000/products")
    //         .then(async response => {
    //             const data = await response.json();
    //             console.log("Fetched products:", data);
    //             setProducts(data);
    //         })
    //         .catch(error => console.error("Error fetching products:", error));
    // }, [])

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("http://localhost:3000/products");
                const data = await response.json();
                console.log("Fetched products:", data);
                setProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);
    return(

    <Container sx={{mt:5, display:"flex", flexWrap:"wrap" ,alignContent:"space-around"} } >


            {products.map((product) => (    

                <Box key={product.id} sx={{m:2}} >
                    <ProductCard id={product.id} name={product.name} imageUrl={product.imageUrl} price={product.price} description={product.description} />
                </Box>
            ))} 

        {/* <Grid container={true} spacing={2} display="flex" >
            <Grid size={{ xs: 12, sm: 6, md: 4 }} display="flex" justifyContent="center" >
                <ProductCard />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }} display="flex" justifyContent="center" >
                <ProductCard />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }} display="flex" justifyContent="center" >
                <ProductCard />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }} display="flex" justifyContent="center" >
                <ProductCard />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }} display="flex" justifyContent="center" >
                <ProductCard />
            </Grid>
        </Grid> */}

    </Container>
    )
}
export default HomePage
