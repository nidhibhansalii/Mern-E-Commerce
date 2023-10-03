import React, { useState } from 'react';
import { Grid } from '@mui/material';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/userRelated/userSlice';
import { BasicButton } from '../components/buttonStyles';
import { useNavigate } from 'react-router-dom';
import Popup from '../components/Popup';

const Products = ({ productData }) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { currentRole } = useSelector(state => state.user);

  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const handleAddToCart = (event, product) => {
    event.stopPropagation();
    dispatch(addToCart(product));
  };


  const messageHandler = (event) => {
    event.stopPropagation();
    setMessage("You have to login or register first")
    setShowPopup(true)
  };

  return (
    <>
      <ProductGrid container spacing={3}>
        {productData.map((data) => (
          <Grid item xs={12} sm={6} md={4}
            key={data.id}
            onClick={() => navigate("/product/view/" + data.id)}
            sx={{ cursor: "pointer" }}
          >
            <ProductContainer>
              <ProductImage src={data.productImage} />
              <ProductName>{data.productName}</ProductName>
              <PriceMrp>{data.price.mrp}</PriceMrp>
              <PriceCost>₹{data.price.cost}</PriceCost>
              <PriceDiscount>{data.price.discountPercent}% off</PriceDiscount>
              <AddToCart>
                {currentRole === "Customer" ?
                  <>
                    <BasicButton
                      onClick={(event) => handleAddToCart(event, data)}
                    >
                      Add To Cart
                    </BasicButton>
                  </>
                  :
                  <BasicButton
                    onClick={messageHandler}
                  >
                    Add To Cart
                  </BasicButton>
                }
              </AddToCart>
            </ProductContainer>
          </Grid>
        ))}
      </ProductGrid>
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </>
  )
};

export default Products;

const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
`;

const ProductGrid = styled(Grid)`
  display: flex;
  align-items: center;
`;

const ProductImage = styled.img`
  width: 200px;
  height: auto;
  margin-bottom: 8px;
`;

const ProductName = styled.p`
  font-weight: bold;
  text-align: center;
`;

const PriceMrp = styled.p`
  margin-top: 8px;
  text-align: center;
  text-decoration: line-through;
  color: #525050;
`;

const PriceCost = styled.h3`
  margin-top: 8px;
  text-align: center;
`;

const PriceDiscount = styled.p`
  margin-top: 8px;
  text-align: center;
  color: darkgreen;
`;

const AddToCart = styled.div`
  margin-top: 16px;
`;