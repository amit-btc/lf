import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {productList} from '../../data/productList.js';
import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {connect} from 'react-redux';
import {updateCart} from '../../actions/simpleAction'

const data = productList;
const styles = theme => ({
  card: {
    paddingBottom: 10
  },
  table: {
    minWidth: 700,
    textAlign: 'left'
  },
  media: {
    height: 240
  },
  root: {
    flexGrow: 1,
    marginTop: 50,
    backgroundColor: '#fff',
    maxWidth: 1100,
    margin: '0 auto'
  },
  gridItem: {
    marginBottom: 30
  },
  image: {
    width: 700,
    height: 467
  },
  productInfo: {
    paddingLeft: 20,
    paddingTop: 20
  }
});

class Checkout extends Component {
  constructor(props) {
    super(props);
    console.log("constructor",this.props.cart);
    this.state = {
      cart: []
    }
  }

  componentDidMount() {
    const cart = this.props.cart;
    console.log("componentDidMount cart",this.props.cart);
    Object
      .keys(cart)
      .map((item) => {
        return data.map(product => {
          if (product.id === parseInt(item)) {
            return this.setState(prevState => ({
              cart: [
                ...prevState.cart, {
                  title: product.title,
                  price: product.price,
                  qty: cart[item]
                }
              ]
            }))
          }
          return null;
        })
      })
  }

  render() {
    const {classes} = this.props;
    const {cart} = this.state;
    return (
      <div>
        <Grid container className={classes.root} direction="row">
          <Grid item xs>
            <div style={{
              padding: 30
            }}>
              <Typography variant="h6">Cart:</Typography>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell numeric>Price</TableCell>
                    <TableCell numeric>Quantity (g)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cart.map(row => {
                    return (
                      <TableRow key={row.id}>
                        <TableCell component="th" scope="row">
                          {cart.title}
                        </TableCell>
                        <TableCell numeric>{cart.price}</TableCell>
                        <TableCell numeric>{cart.qty}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </Grid>
        </Grid>

      </div>
    );
  }
}

Checkout.propTypes = {
  classes: PropTypes.object.isRequired
};


const mapDispatchToProps = {
  updateCart
};

const mapStateToProps=(state)=> {
  console.log("mapStateToProps",state.simpleReducer.cart);
  return {cart: state.simpleReducer.cart};
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Checkout));