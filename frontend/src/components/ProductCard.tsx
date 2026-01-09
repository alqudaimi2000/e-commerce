import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import type { Product } from '../types/Product';
export default function ProductCard({ id,name,imageUrl,price,description }: Product ) {
  return (
    <Card  sx={{ maxWidth: 345,minWidth: 250 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={imageUrl}
        title={name+id}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}     
        </Typography>
        <Typography variant="h6" color="text.primary">
          ${price.toFixed(2)}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button color="inherit" size="small" startIcon={<AddShoppingCartIcon />} >Add to Cart</Button>
        
      </CardActions>
    </Card>
  );
}


