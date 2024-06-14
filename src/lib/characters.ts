import Akarin1 from '/cards/akari1.webp'
import Akarin2 from '/cards/akari2.webp'
import Ayano1 from '/cards/ayano1.webp'
import Ayano2 from '/cards/ayano2.webp'
import Chinatsu1 from '/cards/chinatsu1.webp'
import Chinatsu2 from '/cards/chinatsu2.webp'
import Chitose1 from '/cards/chitose1.webp'
import Chitose2 from '/cards/chitose2.webp'
import Chizuru1 from '/cards/chizuru1.webp'
import Chizuru2 from '/cards/chizuru2.webp'
import Kyoko1 from '/cards/kyoko1.webp'
import Kyoko2 from '/cards/kyoko2.webp'
import Sakurako1 from '/cards/sakurako1.webp'
import Sakurako2 from '/cards/sakurako2.webp'
import Yui1 from '/cards/yui1.webp'
import Yui2 from '/cards/yui2.webp'
import Reverse from '/yryr.webp'

export enum CardImage {
  REVERSE,
  AKARIN1,
  AKARIN,
  AYANO1,
  AYANO2,
  CHINATSU1,
  CHINATSU2,
  CHITOSE1 ,
  CHITOSE2 ,
  CHIZURU1 ,
  CHIZURU2 ,
  KYOKO1,
  KYOKO2,
  SAKURAKO1,
  SAKURAKO2,
  YUI1,
  YUI2,
}

export const mapToImage = (cardImage: CardImage): string => {
  switch (cardImage) {
    case CardImage.REVERSE:
      return Reverse
    case CardImage.AKARIN1:
      return Akarin1
    case CardImage.AKARIN:
      return Akarin2
    case CardImage.AYANO1:
      return Ayano1
    case CardImage.AYANO2:
      return Ayano2
    case CardImage.CHINATSU1:
      return Chinatsu1
    case CardImage.CHINATSU2:
      return Chinatsu2
    case CardImage.CHITOSE1:
      return Chitose1
    case CardImage.CHITOSE2:
      return Chitose2
    case CardImage.CHIZURU1:
      return Chizuru1
    case CardImage.CHIZURU2:
      return Chizuru2
    case CardImage.KYOKO1:
      return Kyoko1
    case CardImage.KYOKO2:
      return Kyoko2
    case CardImage.SAKURAKO1:
      return Sakurako1
    case CardImage.SAKURAKO2:
      return Sakurako2
    case CardImage.YUI1:
      return Yui1
    case CardImage.YUI2:
      return Yui2
    default:
      return Reverse
  }
}