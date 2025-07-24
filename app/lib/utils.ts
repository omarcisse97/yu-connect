import { getAssetsXML } from "../data/figuredata";
import { TYPEOFSETTYPE, AvatarSize, AvatarDirection, AvatarHeadDirection, AvatarAction, AvatarGesture, AvatarItemsToHold } from "./definitions-avatar";

export const formatDateToLocal = (
  dateStr: string,
  locale: string = 'en-US',
) => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};



export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
};
export const getFiguredataXML = async() => {
    return await getAssetsXML();
}
export const SetTypesTypes: TYPEOFSETTYPE[] = [
    'hr',
    'hd',
    'ch',
    'lg',
    'sh',
    'ha',
    'he',
    'ea',
    'fa',
    'ca',
    'wa',
    'cc',
    'cp'
];

export const IMAGING_URL = 'https://www.habbo.com/habbo-imaging/avatarimage';
export const AvatarSizing: Record<string, AvatarSize> = {
    'small': 's',
    'large': 'l',
    'medium': 'm'
}
export const AvatarFacing: Record<string, AvatarDirection> = {
    'right': '1',
    'down-right': '2',
    'down': '3',
    'down-left': '4',
    'left': '5',
    'up-left': '6',
    'up': '7',
    'up-right': '8',
    
}
export const AvatarHeadFacing: Record<string, AvatarHeadDirection> = {
    'right': '1',
    'down-right': '2',
    'down': '3',
    'down-left': '4',
    'left': '5',
    'up-left': '6',
    'up': '7',
    'up-right': '8',
}
export const AvatarActing: Record<string, AvatarAction> = {
    'idle': 'std',   // standing, default (idle)
    'walk': 'wlk',   // walking
    'sit': 'sit',   // sitting
    'lay': 'lay',   // laying down
    'wave': 'wav',   // waving
    'carry': 'crr',   // carrying/holding item
    'drink': 'drk',   // drinking/eating
    'dance': 'dan',   // dancing
    'sign': 'sig',   // sign gesture
    'agree': 'agr',   // agree gesture
    'disagree': 'dgs',   // disagree gesture
    'eat': 'eat',   // eating (sometimes separate from drink)
    'cry': 'cry',   // crying
    'snowwar': 'snw',   // snowball fight pose
};


export const AvatarExpression: Record<string, AvatarGesture> = {
    'normal': 'nrm',   // neutral/default
    'smile': 'sml',   // happy/smiling
    'angry': 'agr',   // angry
    'surprised': 'srp',   // surprised
    'sleeping': 'eyb',   // sleeping (eyes closed)
    'speak': 'spk',   // speaking/talking
    'sad': 'sad',   // sad
    'cry': 'cry',   // crying (gesture)
    'blink': 'bnk',   // blinking
    'crossed': 'crs',   // crossed arms/annoyed
    'disagree': 'dgs',   // disagree (headshake, sometimes expression)
};

export const AvatarHoldItems: Record<string, AvatarItemsToHold> = {
    'tea': '1',
    'juice': '2',
    'carrot': '3',
    'ice cream': '4',
    'milk': '5',
    'black currant': '6',
    'water': '7',
    'coffee': '8',
    'decaf': '9',
    'mocha': '11',
    'macchiato': '12',
    'espresso': '13',
    'black coffee': '14',
    'iced coffee': '15',
    'cappuccino': '16',
    'java': '17',
    'tap water': '18',
    'habbo cola': '19',
    'hamburger': '21',
    'lime habbo soda': '22',
    'beetroot habbo soda': '23',
    'bubble juice from 1978': '24',
    'love potion': '25',
    'calippo': '26',
    'sake': '28',
    'tomato juice': '29',
    'radioactive liquid': '30',
    'pink champagne': '31',
    'coconut delight': '32',
    'fish': '34',
    'pear': '36',
    'apple': '37',
    'orange': '38',
    'pineapple': '39',
    'fizzy orange': '40',
    'sumppi-kuppi': '41',
    'orange juice': '42',
    'chilled soda': '43',
    'moodi': '47',
    'lollipop': '48',
    'bubble juice bottle': '50',
    'cherry crush soda': '57',
    'cup of blood': '58',
    'chestnuts': '60',
    'skull cup of water': '62',
    'popcorn': '63',
    'banana smoothie': '66',
    'chicken leg': '70',
    'toast': '71',
    'egg nog': '73',
    'toasting goblet': '74',
    'strawberry ice cream': '75',
    'mint ice cream': '76',
    'chocolate ice cream': '77',
    'pink candy floss': '79',
    'blue candy floss': '80',
    'hot dog': '81',
    'juicy apple': '83',
    'ginger bread man': '84',
    'americano': '85',
    'frappuccino': '86',
    'cupcake': '89',
    'blue bubblegum': '92',
    'red bubblegum': '93',
    'pink bubblegum': '94',
    'cake slice': '96',
    'croissant': '97',
    'tomato': '98',
    'aubergine': '99',
    'cabbage': '100',
    'sparkly bubble juice': '101',
    'energy drink': '102',
    'banana': '103',
    'avocado': '104',
    'grapes': '105',
    'smoothie': '106',
    'vegetables juice': '107',
    'burger': '109',
    'crab': '111',
    'red chilli': '112',
    'citrus smoothie': '113',
    'green smoothie': '114',
    'berry smoothie': '115',
    'lemon': '116',
    'cookie': '117',
    'pink ramune': '118',
    'blue ramune': '119',
    'blueberry shaved ice': '120',
    'strawberry shaved ice': '121',
    'takoyaki': '122',
    'ice cream cone': '127',
    'charcoal ice cream': '128',
    'yoghurt': '129',
    'cheese': '130',
    'bread': '131',
    'shrimp': '132',
    'broccoli': '133',
    'watermelon': '134',
    'donut': '135',
    'sausages': '136',
    'popsicle': '137',
    'an open bag of chips': '138',
    'luminescent easter egg': '141',
    'ice drink': '142',
    'chocolate-covered marshmallows on a stick': '143',
    'chocolate-covered strawberry on a stick': '144',
    'fancy coffee': '146',
    'magnifying glass': '148',
    'rose': '1000',
    'black rose': '1001',
    'sunflower': '1002',
    'little red book by kitano': '1003',
    'wise words by a. person': '1004',
    'flying turtles by perry tratchett': '1005',
    'gift flower': '1006',
    'jimson weed': '1007',
    'yellow delight': '1008',
    'pink pandemic': '1009',
    'clip board': '1011',
    'painkiller': '1013',
    'syringe': '1014',
    'biohazard bag': '1015',
    'bolly flower': '1019',
    'hyacinth1': '1021',
    'hyacinth2': '1022',
    'poinsettia': '1023',
    'pudding': '1024',
    'candy cane': '1025',
    'present': '1026',
    'candle': '1027',
    'cereal bowl': '1028',
    'balloon': '1029',
    'hipad': '1030',
    'habbo-lympix torch': '1031',
    'major tom': '1032',
    'ufo': '1033',
    'alien thing': '1034',
    'wrench': '1035',
    'gummy duck': '1036',
    'snake': '1037',
    'stick': '1038',
    'severed hand': '1039',
    'heart': '1040',
    'squid': '1041',
    'bat excrement': '1042',
    'maggot': '1043',
    'dead rat': '1044',
    'dentures': '1045',
    'clearasil cream': '1046',
    'ditch the label flag': '1048',
    'hammer': '1049',
    'paint brush': '1051',
    'duck': '1053',
    'orange balloon': '1054',
    'green balloon': '1055',
    'blue balloon': '1056',
    'pink balloon': '1057',
    'spray': '1060',
    'pink candy skull': '1062',
    'green candy skull': '1063',
    'blue candy skull': '1064',
    'doll toy': '1065',
    'teddy toy': '1066',
    'soldier toy': '1067',
    'manga': '1068',
    'comic': '1069',
    'yellow book': '1070',
    'compass': '1072',
    'dino egg': '1073',
    'green allosaurus': '1074',
    'yellow triceratops': '1075',
    'purple saurophus': '1076',
    'stag beetle': '1079',
    'rhino beetle': '1080',
    'watering can': '1081',
    'pride flag': '1082',
    'spooky pumpkin': '1083',
    'grocery bag': '1084',
    'action dvd': '1085',
    'thriller dvd': '1086',
    'note book': '1087',
    'pencil': '1088',
    'a closed bag of chips': '1089',
    'fishing pole - caught fish': '1090',
    'fishing pole - caught boot': '1091',
    'fishing pole - caught message in a bottle': '1092',
    'sword': '1094',
    'mobile phone': '1096'
};

export const getAvatarImagingParams = () => {
    return {
        imager: IMAGING_URL,
        settypes: SetTypesTypes,
        sizes: AvatarSizing,
        directions: AvatarFacing,
        head_directions: AvatarHeadFacing,
        actions: AvatarActing,
        gestures: AvatarExpression,
        hold_items: AvatarHoldItems,
    }
}
