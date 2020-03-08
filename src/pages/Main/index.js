import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as CartActions from '../../store/modules/cart/actions';

import api from '../../services/api';
import { formatPrice } from '../../util/format';

import {
  Container,
  ProductList,
  Product,
  Photo,
  Title,
  Price,
  ButtonAdd,
  ButtonAddAmount,
  ButtonIconText,
  ButtonAddText,
} from './styles';

export default function Main() {
  const [products, setProducts] = useState([]);

  const amount = useSelector(state =>
    state.cart.reduce((value, product) => {
      value[product.id] = product.amount;

      return value;
    }, {})
  );

  useEffect(() => {
    async function loadProducts() {
      const response = await api.get('/products');

      const data = response.data.map(product => ({
        ...product,
        priceFormatted: formatPrice(product.price),
      }));

      setProducts(data);
    }

    loadProducts();
  }, []);

  const dispatch = useDispatch();

  function handleAddProduct(id) {
    dispatch(CartActions.addToCartRequest(id));
  }

  return (
    <Container>
      <ProductList
        data={products}
        keyExtractor={product => String(product.id)}
        renderItem={({ item }) => (
          <Product>
            <Photo source={{ uri: item.image }} />
            <Title>{item.title}</Title>
            <Price>{item.priceFormatted}</Price>
            <ButtonAdd onPress={() => handleAddProduct(item.id)}>
              <ButtonAddAmount>
                <Icon name="add-shopping-cart" size={20} color="#FFF" />
                <ButtonIconText> {amount[item.id] || 0}</ButtonIconText>
              </ButtonAddAmount>
              <ButtonAddText>ADICIONAR</ButtonAddText>
            </ButtonAdd>
          </Product>
        )}
      />
    </Container>
  );
}
