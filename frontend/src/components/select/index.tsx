// @ts-nocheck
import {
    CSSObject,
    Flex,
    FormControl,
    FormControlProps,
    FormErrorMessage,
    FormLabel,
    TypographyProps,
} from '@chakra-ui/react';
import './index.css';
import { FieldHookConfig, useField } from 'formik';
import React, { FC } from 'react';
import Select, {MenuProps, NamedProps} from 'react-select';
import { Option } from 'react-select/src/filters';

type SelectFieldProps = FieldHookConfig<string[] | string> &
    Partial<Pick<NamedProps, 'options'>> & {
    label?: string;
    fontSize?: TypographyProps['fontSize'];
    zIndex?: number;
    disableErrorMessage?: boolean;
    isMulti?: boolean;
    isClearable?: boolean;
    labelStyles?: object;
    hideIfEmptyOptions?: boolean;
    renderOption?: (option: Option) => JSX.Element;
} & Pick<FormControlProps, 'isRequired' | 'isDisabled'>;

export const SelectField: FC<SelectFieldProps> = ({
    options = [],
    label,
    labelStyles,
    placeholder,
    disableErrorMessage,
    isDisabled,
    isRequired,
    fontSize = 'md',
    zIndex,
    isClearable = true,
    hideIfEmptyOptions = false,
    isMulti = false,
    renderOption = (v) => v.label,
    ...props
}) => {
    const [field, meta, handlers] = useField(props);

    const onChange = (option: any) => {
        handlers.setValue(isMulti ? option?.map((item: { value: any; }) => item.value) : option?.value);
    };

    const getValue = () => {
        if (options) {
            return isMulti
                ? options.filter((option: any) => field.value.indexOf(option.value) >= 0)
                : options.find((option: any) => option.value === field.value);
        } else {
            return isMulti ? [] : ('' as any);
        }
    };

    const showSelect = () => {
        if (Array.isArray(options)) {
            return !!options.length;
        }

        return !!options;
    };

    if (!showSelect()) {
        return null;
    }

    return (
        <FormControl
            _invalid={meta.error && meta.touched}
            minW="130px"
            {...{ isRequired, isDisabled }}
            zIndex={zIndex}
        >
            {label && (
                <Flex flexDir="row">
                    <FormLabel htmlFor={props.name} fontSize={fontSize} style={labelStyles} mr="5px">{label}</FormLabel>
                    {props.required &&
                        <span style={{color: "red"}}>*</span>
                    }
                </Flex>
            )}

            <Select
                isSearchable
                color={props.color}
                // styles={{ menu(base: CSSObject, props: MenuProps<OptionType, IsMulti, GroupType>): CSSObject {
                //         base: { zIndex: 1000 }
                //     }}}
                isClearable={!isMulti}
                isMulti={isMulti}
                isDisabled={isDisabled}
                id={props.name}
                // menuIsOpen={true}
                name={field.name}
                options={options}
                components={{ IndicatorSeparator: null }}
                formatOptionLabel={renderOption}
                placeholder={placeholder}
                value={getValue()}
                onBlur={() => handlers.setTouched(true)}
                onChange={onChange}
                data-at={'select'}
            />

            {!disableErrorMessage && <FormErrorMessage>{meta.error}</FormErrorMessage>}
        </FormControl>
    );
};