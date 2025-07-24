import {
    BOOLEANCLUB,
    BOOLEANSTRING,
    Color,
    COLORINDEX,
    Colors,
    FigureDataPaletteXML,
    FigureDataSettypeXML,
    FigureDataXML,
    GENDER,
    GENDERARRAY,
    Palette,
    Palettes,
    Part,
    PARTINDEX,
    Parts,
    Set,
    Sets,
    SetType,
    SetTypes,
    TYPEOFSETTYPE
} from "@/app/lib/definitions-avatar";

export class AvatarColor {
    color: Color;

    constructor(colorData: Color) {
        this.color = colorData;
    }

    getColor() {
        return this.color;
    }
    getID() {
        return this.color.id;
    }
    getIndex() {
        return this.color.index;
    }
    getClub() {
        return this.color.club;
    }
    isSelectable() {
        return this.color.selectable === 1;
    }

    setID(id: string) {
        this.color.id = id;
    }
    setIndex(index: string) {
        this.color.index = index;
    }
    setClub(club: BOOLEANCLUB) {
        this.color.club = club;
    }
    setSelectable(selectable: BOOLEANSTRING) {
        this.color.selectable = selectable;
    }
    setColor(
        id: string = this.color.id,
        index: string = this.color.index,
        club: BOOLEANCLUB = this.color.club,
        selectable: BOOLEANSTRING = this.color.selectable,
        hex: string = this.color.hex
    ) {
        this.color = {
            id: id,
            index: index,
            club: club,
            selectable: selectable,
            hex: hex
        }
    }

}
type AvatarColors = AvatarColor[];
export class AvatarPalette {
    palette: Palette;
    colors: AvatarColors;

    constructor(palette: Palette) {
        this.palette = palette;
        this.colors = [];
        this.palette.colors.map((color) => {
            this.colors.push(
                new AvatarColor(color)
            )
        });
    }

    getColors() {
        return this.colors;
    }
    getColorByID(id: string) {
        return this.colors.find((color) => color.getID() === id) ?? null;
    }
    getColorByIndex(index: string) {
        return this.colors.find((color) => color.getIndex() === index) ?? null;
    }
    getColorsBySelectable(bool: boolean) {
        return this.colors.filter((color) => color.isSelectable() === bool);
    }
    getRandomColors(colorSize: number) {

        const retVal: AvatarColors = [];
        if (colorSize <= this.colors.length && colorSize >= 1) {
            for (let i = 0; i < colorSize; i++) {
                const randIdx = Math.floor(Math.random() * this.colors.length);
                retVal.push(this.colors[randIdx]);
            }
        }

        return retVal;

    }
    getPalette() {
        return this.palette;
    }
    getPaletteID() {
        return this.palette.id;
    }

    setColors(colors: Colors) {
        this.palette.colors = colors;
        this.colors = colors.map((color) => {
            return new AvatarColor(color);
        });
    }
    addColor(color: Color) {
        this.palette.colors.push(color);
        this.colors.push(new AvatarColor(color));
    }
    setPalette(palette: Palette) {
        this.palette = palette
    }
    setPaletteID(id: string) {
        this.palette.id = id;
    }
}
type AvatarPalettes = AvatarPalette[];

export class AvatarPart {
    part: Part;
    constructor(part: Part) {
        this.part = part;
    }

    getPart() {
        return this.part;
    }
    getID() {
        return this.part.id;
    }
    getType() {
        return this.part.type;
    }
    isColorable() {
        return this.part.colorable === 1;
    }
    getIndex() {
        return this.part.index;
    }
    getColorIndex() {
        return this.part.colorindex;
    }

    setPart(
        id: string = this.part.id,
        type: string = this.part.type,
        colorable: BOOLEANSTRING = this.part.colorable,
        index: PARTINDEX = this.part.index,
        colorindex: COLORINDEX = this.part.colorindex
    ) {
        this.part = {
            id: id,
            type: type,
            colorable: colorable,
            index: index,
            colorindex: colorindex
        }
    }
    setID(id: string) {
        this.part.id = id;
    }
    setType(type: string) {
        this.part.type = type;
    }
    setColorable(colorable: BOOLEANSTRING) {
        this.part.colorable = colorable;
    }
    setIndex(index: PARTINDEX) {
        this.part.index = index;
    }
    setColorIndex(colorindex: COLORINDEX) {
        this.part.colorindex = colorindex;
    }
}
type AvatarParts = AvatarPart[];

export class AvatarSet {
    set: Set
    parts: AvatarParts
    selectedColors: AvatarColors
    constructor(set: Set) {
        this.set = set;
        this.parts = [];
        this.selectedColors = [];
        set.parts.map((part) => {
            this.parts.push(new AvatarPart(part));
        });
        set.selectedColors.map((color) => {
            this.selectedColors.push(new AvatarColor(color))
        });
        if (set.colorSize < 1) {
            let max = 0;
            this.parts.map((part) => {
                max = Math.max(Number(part.getColorIndex()), max);
            })
            this.set.colorSize = max;
        }
    }

    getSet() {
        return this.set;
    }
    getID() {
        return this.set.id;
    }
    getGender() {
        return this.set.gender;
    }
    getClub() {
        return this.set.club;
    }
    isColorable() {
        return this.set.colorable === 1;
    }
    isPreSelectable() {
        return this.set.preselectable === 1;;
    }
    isSelectable() {
        return this.set.selectable === 1;
    }
    isSellable() {
        return this.set.sellable === 1;
    }
    getColorSize() {
        return this.set.colorSize;
    }
    getSelectedColors() {
        return this.set.selectedColors;
    }
    getSelectedColorByIndex(index: number) {
        return this.selectedColors[index] ?? null;
    }
    getParts() {
        return this.parts;
    }
    getPartByID(id: string) {
        return this.parts.find((part) => part.getID() === id) ?? null;
    }



    setSet(
        id: string = this.set.id,
        gender: GENDER = this.set.gender,
        club: BOOLEANCLUB = this.set.club,
        colorable: BOOLEANSTRING = this.set.colorable,
        preselectable: BOOLEANSTRING = this.set.preselectable,
        selectable: BOOLEANSTRING = this.set.selectable,
        sellable: BOOLEANSTRING = this.set.sellable,
        colorSize: number = this.set.colorSize,
        selectedColors: Colors = this.set.selectedColors,
        parts: Parts = this.set.parts

    ) {
        this.set = {
            id: id,
            gender: gender,
            club: club,
            colorable: colorable,
            preselectable: preselectable,
            selectable: selectable,
            sellable: sellable,
            colorSize: colorSize,
            selectedColors: selectedColors,
            parts: parts
        }
    }
    setID(id: string) {
        this.set.id = id;
    }
    setGender(gender: GENDER) {
        this.set.gender = gender;
    }
    setClub(club: BOOLEANCLUB) {
        this.set.club = club;
    }
    setColorable(colorable: BOOLEANSTRING) {
        this.set.colorable = colorable;
    }
    setPreSelectable(preselectable: BOOLEANSTRING) {
        this.set.preselectable = preselectable;
    }
    setSelectable(selectable: BOOLEANSTRING) {
        this.set.selectable = selectable;
    }
    setSellable(sellable: BOOLEANSTRING) {
        this.set.sellable = sellable;
    }
    setColorSize(colorSize: number) {
        this.set.colorSize = colorSize;
    }
    setSelectedColors(selectedColors: Colors) {
        this.set.selectedColors = selectedColors;
        this.selectedColors = [];
        selectedColors.map((color) => {
            this.selectedColors.push(new AvatarColor(color));
        })
    }
    setSelectedColorsAtIndex(index: number, color: Color) {
        this.set.selectedColors[index] = color;
        this.selectedColors[index] = new AvatarColor(color);
    }
    refreshColorSize() {
        let max = 0;
        this.parts.map((part) => {
            max = Math.max(Number(part.getColorIndex()), max);
        })
        this.setColorSize(max);
    }
    setParts(parts: Parts) {
        this.set.parts = parts;
    }
    addPart(part: Part) {
        this.set.parts.push(part);
        this.parts.push(new AvatarPart(part));
        this.refreshColorSize()
    }
    build() {
        if (this.isColorable() === false) {
            return this.getID();
        }
        const partsColors: string[] = [];
        this.parts.map((part) => {
            const coloridx = part.getColorIndex();
            if (coloridx !== 0) {
                const idxArr = Number(coloridx) - 1;
                if (partsColors[idxArr] === undefined) {
                    const color = this.getSelectedColorByIndex(idxArr) as AvatarColor;
                    if (color) {
                        partsColors[idxArr] = color.getID();
                    }

                }
            }
        })
        return partsColors.length === this.set.colorSize ? `${this.getID()}-${partsColors.join('-')}` : this.getID()
    }

}
type AvatarSets = AvatarSet[];

export class AvatarSetType {
    setType: SetType;
    palette: AvatarPalette;
    sets: AvatarSets;
    constructor(setType: SetType) {
        this.setType = setType;
        this.palette = new AvatarPalette(this.setType.palette);
        this.sets = [];
        setType.sets.map((set) => {
            this.sets.push(new AvatarSet(set));
        });
    }

    getSetType() {
        return this.setType;
    }
    getType() {
        return this.setType.type;
    }
    getPaletteID() {
        return this.setType.paletteid;
    }
    getPalette() {
        return this.palette;
    }
    getSet() {
        return this.sets;
    }
    getSetsByGender(gender: GENDER) {
        return this.sets.filter((set) => set.getGender() === gender)
    }
    getSetsByGenderAndU(gender: GENDER) {
        return this.sets.filter((set) => set.getGender() === gender || set.getGender() === 'U');
    }
    getSetById(id: string) {
        return this.sets.find((set) => set.getID() === id) ?? null;
    }
    isMandatoryInPreview(gender: 'M' | 'F') {
        return gender === 'M' ? this.setType.mand_m_0 === 1 : this.setType.mand_f_0 === 1;
    }
    isMandatoryInActive(gender: 'M' | 'F') {
        return gender === 'M' ? this.setType.mand_m_1 === 1 : this.setType.mand_f_1 === 1;
    }
    getSetGroupByGender(genders: GENDERARRAY = ['M', 'F', 'U']) {
        const obj: Record<string, AvatarSets> = {};
        genders.map((gender) => {
            obj[gender] = this.getSetsByGender(gender);
        });
        return obj;
    }
    getRandomSet(
        gender: GENDER,
        selectable: boolean = true,
        preselectable: boolean = true,
        skipSelectable: boolean = false,
        skipPreselectable: boolean = false

    ) {
        const sets = this.sets.filter((set) => {
            const isPreSelectable = skipPreselectable === false ? set.isPreSelectable() === preselectable : true;
            const isSelectable = skipSelectable === false ? set.isSelectable() === selectable : true;
            const isGender = set.getGender() === gender || set.getGender() === 'U';
            return isGender && isSelectable === true && isPreSelectable === true;
        });

        const randIndex = Math.floor(Math.random() * sets.length);
        return sets[randIndex] ?? null;
    }
    setSetType(
        type: TYPEOFSETTYPE = this.setType.type,
        paletteid: string = this.setType.paletteid,
        palette: Palette = this.setType.palette,
        sets: Sets = this.setType.sets,
        mand_m_0: BOOLEANSTRING = this.setType.mand_m_0,
        mand_m_1: BOOLEANSTRING = this.setType.mand_m_1,
        mand_f_0: BOOLEANSTRING = this.setType.mand_f_0,
        mand_f_1: BOOLEANSTRING = this.setType.mand_f_1
    ) {
        this.setType = {
            type: type,
            paletteid: paletteid,
            palette: palette,
            sets: sets,
            mand_m_0: mand_m_0,
            mand_m_1: mand_m_1,
            mand_f_0: mand_f_0,
            mand_f_1: mand_f_1
        }
        this.palette = new AvatarPalette(palette);
        this.sets = [];
        sets.map((set) => {
            this.sets.push(new AvatarSet(set));
        });
    }
    setSetTypeType(type: TYPEOFSETTYPE) {
        this.setType.type = type;
    }
    setPaletteID(paletteid: string) {
        this.setType.paletteid = paletteid;
    }
    setPalette(palette: Palette) {
        this.setType.palette = palette;
        this.palette = new AvatarPalette(palette);
    }
    setMandatoryPreview(gender: 'M' | 'F', bool: BOOLEANSTRING) {
        if (gender === 'M') {
            this.setType.mand_m_0 = bool;
        } else {
            this.setType.mand_f_0 = bool;
        }
    }
    setMandatoryActive(gender: 'M' | 'F', bool: BOOLEANSTRING) {
        if (gender === 'M') {
            this.setType.mand_m_1 = bool;
        } else {
            this.setType.mand_f_1 = bool;
        }
    }
    build() {
        const mBuilder: string[] = [];
        const fBuilder: string[] = [];
        const uBuilder: string[] = [];
        this.sets.map((set) => {
            switch (set.getGender()) {
                case 'M': mBuilder.push(`${this.getType()}-${set.build()}`); break;
                case 'F': fBuilder.push(`${this.getType()}-${set.build()}`); break;
                case 'U': uBuilder.push(`${this.getType()}-${set.build()}`); break;
                default: break;
            }
        });

        return {
            'M': mBuilder,
            'F': fBuilder,
            'U': uBuilder
        }
    }
}
type AvatarSetTypes = AvatarSetType[];
export class AvatarAssets {
    palettes: AvatarPalettes;
    setTypes: AvatarSetTypes;

    constructor(
        palettes: Palettes | null = null,
        setTypes: SetTypes | null = null
    ) {
        this.palettes = [];
        this.setTypes = [];

        if (palettes) {
            palettes.map((palette) => {
                this.palettes.push(new AvatarPalette(palette))
            });
        }

        if (setTypes) {
            setTypes.map((setType) => {
                this.setTypes.push(new AvatarSetType(setType))
            })
        }
    }
    getPalettes() {
        return this.palettes;
    }
    getPaletteByID(id: string) {
        return this.palettes.find((palette) => palette.getPaletteID() === id) ?? null;
    }
    getSettype() {
        return this.setTypes;
    }
    getSettypeByType(type: string) {
        return this.setTypes.find((settype) => settype.getType() === type) ?? null;
    }
    getSettypesThatIncludeGender(gender: GENDER) {
        const temp = this.setTypes.filter((settype) => {
            return settype.getSet().some((set) => set.getGender() === gender);
        })
        return temp;
    }
    getObjSettypeGroupByType(type: string[] | null = null) {
        const obj: Record<string, AvatarSetType> = {}
        if (!type) {
            this.setTypes.map((settype) => {
                obj[settype.getType() as string] = settype;
            })
        } else {
            type.map((t) => {
                const settype = this.getSettypeByType(t);
                if (settype) {
                    obj[t] = settype;
                }
            })
        }

        return obj;

    }
    getRandomSetByTypeAndGender(
        type: TYPEOFSETTYPE,
        gender: GENDER,
        selectable: boolean = true,
        preselectable: boolean = true,
        skipSelectable: boolean = false,
        skipPreselectable: boolean = false

    ) {
        const settype = this.setTypes.find((settype) => settype.getType() === type) ?? null;
        if (!settype) {
            return null;
        }
        return settype.getRandomSet(gender, selectable, preselectable, skipSelectable, skipPreselectable);
    }


    loadFigureDataPalettes(palettes: FigureDataPaletteXML[]) {
        this.palettes = palettes.map((palette) => {
            return new AvatarPalette({
                id: palette["@_id"],
                colors: palette.color.map((color) => {
                    return {
                        id: color["@_id"],
                        index: color["@_index"],
                        club: color["@_club"],
                        selectable: color["@_selectable"],
                        hex: color["#text"]
                    } as Color;
                })
            } as Palette);
        })
    }
    loadFigureDataSettypes(sets: FigureDataSettypeXML[]) {
        this.setTypes = [];
        sets.map((settype) => {
            const palette = this.getPaletteByID(settype["@_paletteid"]);
            if (palette) {
                this.setTypes.push(new AvatarSetType({
                    type: settype["@_type"],
                    paletteid: settype["@_paletteid"],
                    palette: palette.getPalette() as Palette,
                    sets: settype.set.map((set) => {
                        return {
                            id: set["@_id"],
                            gender: set["@_gender"],
                            club: set["@_club"],
                            colorable: set["@_colorable"],
                            preselectable: set["@_preselectable"],
                            selectable: set["@_selectable"],
                            sellable: set["@_sellable"],
                            selectedColors: [] as Color[],
                            parts: Array.isArray(set.part) ?
                                set.part.map((part) => {
                                    return {
                                        id: part["@_id"],
                                        type: part["@_type"],
                                        colorable: part["@_colorable"],
                                        index: part["@_index"],
                                        colorindex: part["@_colorindex"]
                                    } as Part;
                                })
                                : typeof set?.part === 'object' && set?.part !== null ?
                                    [
                                        {
                                            id: set.part["@_id"],
                                            type: set.part["@_type"],
                                            colorable: set.part["@_colorable"],
                                            index: set.part["@_index"],
                                            colorindex: set.part["@_colorindex"]
                                        } as Part
                                    ] as Parts
                                    : [] as Parts,
                            colorSize: 0

                        } as Set
                    }),
                    mand_m_0: settype["@_mand_m_0"],
                    mand_m_1: settype["@_mand_m_1"],
                    mand_f_0: settype["@_mand_f_0"],
                    mand_f_1: settype["@_mand_f_1"]
                } as SetType))
            }
        });
        this.setTypes.map((settype) => {
            settype.getSet().map((set) => {
                set.getSelectedColors();
            })
        })

    }

    loadFromFigureData(figureData: FigureDataXML) {
        this.loadFigureDataPalettes(figureData.colors.palette);
        this.loadFigureDataSettypes(figureData.sets.settype);
    }
}