'use server' 

import { XMLParser } from 'fast-xml-parser';

import {
    AvatarAction,
    AvatarDirection,
    AvatarGesture,
    AvatarHeadDirection,
    AvatarItemsToHold,
    AvatarSize,
    FigureDataXML,
    TYPEOFSETTYPE
} from '../lib/definitions-avatar';
// import { habboWardrobeIcons } from '../assets/HabboAssets/habboWardrobeIcons';

export const getAssetsXML = async () => {
    const fs = await import('fs');
    const path = await import('path');
    const parser = new XMLParser({
        ignoreAttributes: false,
        attributeNamePrefix: "@_",
        alwaysCreateTextNode: false,
        parseAttributeValue: true,
        trimValues: true
    });
    const filePath = path.join(process.cwd(), 'public', 'figuredata.xml');
    const xmlContent = fs.readFileSync(filePath, 'utf8');
    const figureData = parser.parse(xmlContent) ?? null;
    return { sets: figureData.figuredata as FigureDataXML }

}




