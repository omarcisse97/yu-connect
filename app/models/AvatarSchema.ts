import {
    COLORINDEX,
    SetAvatar,
    SetsAvatar,
    TYPEOFSETTYPE
} from "@/app/lib/definitions-avatar";
import { getAvatarImagingParams } from "../lib/utils";
import { AvatarAssets } from "./AvatarAssetsSchema";

const IMAGING_UTILS = getAvatarImagingParams();

export class Avatar {
    sets: SetsAvatar;
    gender: 'M' | 'F';
    constructor(gender: 'M' | 'F', sets: SetsAvatar | null = null) {
        this.gender = gender;
        if (sets) {
            this.sets = sets;
        } else {
            this.sets = [];
        }


    }
    defaultSet(gender: 'M' | 'F' = this.gender, assets: AvatarAssets) {
        try {
            if (assets.setTypes.length < 1) {
                throw new Error('No data in avatar asset');
            }

            const defaultSets: SetsAvatar = IMAGING_UTILS.settypes.map((type) => {
                const settype = assets.getSettypeByType(type);
                const palette = settype?.getPalette();
                if (!settype || !palette) {
                    throw new Error(`Settype or palette is null for type "${type}"`);
                }
                const setInstance = settype.getRandomSet(gender, true, true, false, true);
                if (!setInstance) {
                    return {
                        type: type,
                        color: [],
                        set: ''
                    } as SetAvatar;
                } else {
                    const set = setInstance.getID();
                    let color: string[] = [];
                    if (setInstance.isColorable() === true) {
                        setInstance.refreshColorSize();
                        const colorsInstance = palette.getRandomColors(setInstance.getColorSize());
                        color = colorsInstance.map((instance) => {
                            return instance.getID() as string;
                        });
                    }
                    return {
                        type: type,
                        color: color,
                        set: set
                    } as SetAvatar
                }
            })

            this.sets = defaultSets;
        } catch (error) {
            console.error('Failed to load default det. Error(s): ', error);
            throw new Error(`Failed to load default set for gender "${gender}"`);
        }
    }

    getSets() {
        return this.sets;
    }
    getSetByType(type: TYPEOFSETTYPE) {
        return this.sets.find((set) => set.type === type);
    }
    setSets(sets: SetsAvatar) {
        this.sets = sets;
    }
    setSet(set: SetAvatar, updateColor: boolean = false) {
        const temp = this.sets.find((setKey) => setKey.type === set.type) ?? null;
        if (temp) {
            temp.set = set.set;
            if (updateColor) {
                temp.color = set.color;
            }

        }
    }
    setColorToSet(color: string[], type: TYPEOFSETTYPE) {
        const temp = this.sets.find((set) => set.type === type) ?? null;
        if (temp) {
            temp.color = color;
        }
    }
    addColorToSet(color: string, setType: TYPEOFSETTYPE, idx: COLORINDEX) {
        const temp = this.sets.find((set) => set.type === setType) ?? null;
        if (temp) {
            if (temp.color.length < Number(idx)) {
                temp.color.push(color);
            } else {
                temp.color[Number(idx) - 1] = color;
            }
        }
    }
    buildFigure() {
        const temp: string[] = [];
        for (let i = 0; i < this.sets.length; i++) {
            const type = this.sets[i].type;
            const set = this.sets[i].set;
            const color = this.sets[i].color;
            if (set === '') {
                continue;
            }
            temp.push(`${type}-${set}${color.length >= 1 ? `-${color.join('-')}` : ''}`);
        }
        return `${temp.join('.')}.`;

    }
    getImage(
        size: keyof typeof IMAGING_UTILS.sizes = 'small',
        direction: keyof typeof IMAGING_UTILS.directions = 'down-right',
        head_direction: keyof typeof IMAGING_UTILS.head_directions = 'down-right',
        action: keyof typeof IMAGING_UTILS.actions = 'idle',
        gesture: keyof typeof IMAGING_UTILS.gestures = 'normal',
        holdItem: keyof typeof IMAGING_UTILS.hold_items | null,
        headOnly: boolean = false
    ) {
        const params: string[] = [];

        params.push(`figure=${this.buildFigure()}`);
        params.push(`gesture=${IMAGING_UTILS.gestures[gesture]}`);
        params.push(action === 'hold' ?
            !holdItem ?
                ''
                : `action=${IMAGING_UTILS.actions[action]}-${IMAGING_UTILS.hold_items[holdItem]}`
            : `action=${IMAGING_UTILS.actions[action]}`);
        params.push(`direction=${IMAGING_UTILS.directions[direction]}`);
        params.push(`head_direction=${IMAGING_UTILS.head_directions[head_direction]}`);

        params.push(headOnly === true ? `headonly=1` : `size=${size}`);
        params.push(`gender=${this.gender}`);
        return `${IMAGING_UTILS.imager}?${params.join('&')}`;
    }

    getFigureJSON() {
        return JSON.stringify(this.sets);
    }
    fromJSON(figureString: string, gender: 'M' | 'F' = this.gender) {
        this.sets = JSON.parse(figureString) as SetsAvatar;
        this.gender = gender;
    }

}
