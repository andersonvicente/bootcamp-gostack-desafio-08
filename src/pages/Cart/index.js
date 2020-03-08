import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as CartActions from '../../store/modules/cart/actions';

import { formatPrice } from '../../util/format';

import {
  Container,
  List,
  ProductSubtotal,
  Product,
  Photo,
  TitlePrice,
  Title,
  Price,
  SubtotalBar,
  AmountGroup,
  Amount,
  EmptyCart,
  EmptyCartText,
  Total,
  TotalText,
  TotalPriceText,
  FinishButton,
  FinishButtonText,
} from './styles';

export default function Cart() {
  const products = useSelector(state =>
    state.cart.map(product => ({
      ...product,
      subtotal: formatPrice(product.price * product.amount),
    }))
  );

  const total = useSelector(state =>
    formatPrice(
      state.cart.reduce((totalSum, product) => {
        return totalSum + product.price * product.amount;
      }, 0)
    )
  );

  const dispatch = useDispatch();

  function increment(product) {
    dispatch(CartActions.updateAmountRequest(product.id, product.amount + 1));
  }

  function decrement(product) {
    dispatch(CartActions.updateAmountRequest(product.id, product.amount - 1));
  }

  return (
    <Container>
      {products.length > 0 ? (
        <>
          <List count={products.length}>
            {products.map(item => (
              <ProductSubtotal key={item.id}>
                <Product>
                  <Photo source={{ uri: item.image }} />
                  <TitlePrice>
                    <Title>{item.title}</Title>
                    <Price>{item.priceFormatted}</Price>
                  </TitlePrice>
                  <Icon
                    name="delete-forever"
                    size={40}
                    color="#7159c1"
                    onPress={() =>
                      dispatch(CartActions.removeFromCart(item.id))
                    }
                  />
                </Product>
                <SubtotalBar>
                  <AmountGroup>
                    <Icon
                      name="remove-circle-outline"
                      size={20}
                      color="#7159c1"
                      onPress={() => decrement(item)}
                    />
                    <Amount>{item.amount}</Amount>
                    <Icon
                      name="add-circle-outline"
                      size={20}
                      color="#7159c1"
                      onPress={() => increment(item)}
                    />
                  </AmountGroup>
                  <Price>{item.subtotal}</Price>
                </SubtotalBar>
              </ProductSubtotal>
            ))}
            <Total>
              <TotalText>TOTAL</TotalText>
              <TotalPriceText>{total}</TotalPriceText>
              <FinishButton>
                <FinishButtonText>FINALIZAR PEDIDO</FinishButtonText>
              </FinishButton>
            </Total>
          </List>
        </>
      ) : (
        <EmptyCart>
          <Icon name="remove-shopping-cart" size={60} color="#999" />
          <EmptyCartText>Seu carrinho está vazio.</EmptyCartText>
        </EmptyCart>
      )}
    </Container>
  );
}
