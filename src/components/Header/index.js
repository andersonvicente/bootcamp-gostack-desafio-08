import React from 'react';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Wrapper,
  Container,
  ButtonLogo,
  Logo,
  ButtonBasketContainer,
  ItemCount,
} from './styles';

export default function Header({ navigation }) {
  const cartSize = useSelector(state => state.cart.length);

  return (
    <Wrapper>
      <Container>
        <ButtonLogo onPress={() => navigation.navigate('Main')}>
          <Logo />
        </ButtonLogo>
        <ButtonBasketContainer onPress={() => navigation.navigate('Cart')}>
          <Icon name="shopping-basket" color="#FFF" size={24} />
          <ItemCount>{cartSize || 0}</ItemCount>
        </ButtonBasketContainer>
      </Container>
    </Wrapper>
  );
}
