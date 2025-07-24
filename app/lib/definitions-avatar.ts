export type GENDER = 'M' | 'F' | 'U';
export type BOOLEANSTRING = 0 | 1;
export type GENDERARRAY = GENDER[];
export type BOOLEANCLUB = 0 | 2;
export type PARTINDEX = 0 | 1 | 2;
export type COLORINDEX = 0 | 1 | 2 | 3;

export type TYPEOFSETTYPE =
    'hr' |
    'hd' |
    'ch' |
    'lg' |
    'sh' |
    'ha' |
    'he' |
    'he' |
    'ea' |
    'fa' |
    'ca' |
    'wa' |
    'cc' |
    'cp';

export type Color = {
    id: string,
    index: string,
    club: BOOLEANCLUB,
    selectable: BOOLEANSTRING,
    hex: string
}
export type Colors = Color[];

export type Palette = {
    id: string,
    colors: Colors
}
export type Palettes = Palette[];

export type Part = {
    id: string,
    type: string,
    colorable: BOOLEANSTRING,
    index: PARTINDEX,
    colorindex: COLORINDEX
}
export type Parts = Part[];

export type Set = {
    id: string,
    gender: GENDER,
    club: BOOLEANCLUB,
    colorable: BOOLEANSTRING,
    preselectable: BOOLEANSTRING,
    selectable: BOOLEANSTRING,
    sellable: BOOLEANSTRING,
    parts: Parts,
    colorSize: number,
    selectedColors: Colors
}
export type Sets = Set[];

export type SetType = {
    type: TYPEOFSETTYPE,
    paletteid: string,
    palette: Palette,
    sets: Sets,
    mand_m_0: BOOLEANSTRING,
    mand_m_1: BOOLEANSTRING,
    mand_f_0: BOOLEANSTRING,
    mand_f_1: BOOLEANSTRING
}
export type SetTypes = SetType[];

export type FigureDataColorXML = {
    '@_id': string,
    '@_index': string,
    '@_club': BOOLEANCLUB,
    '@_selectable': BOOLEANSTRING,
    '#text': string
}
export type FigureDataPaletteXML = {
    '@_id': string,
    color: FigureDataColorXML[]
}

export type FigureDataColorsXML = {
    palette: FigureDataPaletteXML[];
}
export type FigureDataPartXML = {
    '@_id': string,
    '@_type': string,
    '@_colorable': BOOLEANSTRING,
    '@_index': PARTINDEX,
    '@_colorindex': COLORINDEX

}
export type FigureDataSetXML = {
    '@_gender': GENDER,
    '@_id': string,
    '@_club': BOOLEANCLUB,
    '@_colorable': BOOLEANSTRING,
    '@_preselectable': BOOLEANSTRING,
    '@_selectable': BOOLEANSTRING,
    '@_sellable': BOOLEANSTRING
    part: FigureDataPartXML[] | FigureDataPartXML
}
export type FigureDataSettypeXML = {
    '@_type': string,
    '@_paletteid': string,
    '@_mand_m_0': BOOLEANSTRING,
    '@_mand_m_1': BOOLEANSTRING,
    '@_mand_f_0': BOOLEANSTRING,
    '@_mand_f_1': BOOLEANSTRING,
    set: FigureDataSetXML[]

}
export type FigureDataSetsXML = {
    settype: FigureDataSettypeXML[]
}
export type FigureDataXML = {
    colors: FigureDataColorsXML,
    sets: FigureDataSetsXML
}

export type SetAvatar = {
    type: TYPEOFSETTYPE,
    color: string[],
    set: string
};
export type SetsAvatar = SetAvatar[];
export type AvatarSize = 'l' | 'm' | 's';
export type AvatarDirection = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8';
export type AvatarHeadDirection = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8';
export type AvatarAction =
  | 'std'  
  | 'wlk'  
  | 'sit'  
  | 'lay'  
  | 'wav'  
  | 'crr'  
  | 'drk'  
  | 'dan'  
  | 'sig'  
  | 'agr'  
  | 'dgs'  
  | 'eat'  
  | 'cry'  
  | 'snw'  
  ;
export type AvatarGesture = 
'sml' | 
'sad' | 
'agr' | 
'srp' | 
'eyb' | 
'spk' | 
'nrm' | 
'dgs' | 
'crs' | 
'cry' | 
'bnk';

export type AvatarItemsToHold =
  | '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'
  | '10' | '11' | '12' | '13' | '14' | '15' | '16' | '17' | '18' | '19'
  | '20' | '21' | '22' | '23' | '24' | '25' | '26' | '27' | '28' | '29'
  | '30' | '31' | '32' | '34' | '35' | '36' | '37' | '38' | '39' | '40'
  | '41' | '42' | '43' | '46' | '47' | '48' | '49' | '50' | '51' | '52'
  | '53' | '54' | '55' | '56' | '57' | '58' | '59' | '60' | '61' | '62'
  | '63' | '64' | '65' | '66' | '67' | '68' | '69' | '70' | '71' | '72'
  | '73' | '74' | '75' | '76' | '77' | '78' | '79' | '80' | '81' | '83'
  | '84' | '85' | '86' | '89' | '92' | '93' |  '94' | '96' | '97' | '98' | '99'
  | '100' | '101' | '102' | '103' | '104' | '105' | '106' | '107' | '109'
  | '111' | '112' | '113' | '114' | '115' | '116' | '117' | '118' | '119'
  | '120' | '121' | '122' | '127' | '128' | '129' | '130' | '131' | '132'
  | '133' | '134' | '135' | '136' | '137' | '138' | '141' | '142' | '143'
  | '144' | '146' | '148'
  | '1000' | '1001' | '1002' | '1003' | '1004' | '1005' | '1006' | '1007' | '1008' | '1009'
  | '1011' | '1013' | '1014' | '1015' | '1016' | '1017' | '1018' | '1019' | '1021' | '1022'
  | '1023' | '1024' | '1025' | '1026' | '1027' | '1028' | '1029' | '1030' | '1031' | '1032'
  | '1033' | '1034' | '1035' | '1036' | '1037' | '1038' | '1039' | '1040' | '1041' | '1042'
  | '1043' | '1044' | '1045' | '1046' | '1047' | '1048'
  | '1049' | '1051' | '1053' | '1054' | '1055' | '1056' | '1057'
  | '1060' | '1062' | '1063' | '1064' | '1065' | '1066' | '1067' | '1068' | '1069' | '1070'
  | '1072' | '1073' | '1074' | '1075' | '1076' | '1079' | '1080' | '1081' | '1082' | '1083'
  | '1084' | '1085' | '1086' | '1087' | '1088' | '1089' | '1090' | '1091' | '1092' | '1094'
  | '1096'
  ;

