import {OptionValue} from "./OptionValue";

export interface Option {
    title: string;
    type: string;
    values: OptionValue[];
}
