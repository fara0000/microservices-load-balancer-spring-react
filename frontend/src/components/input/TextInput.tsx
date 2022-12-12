import {
    Flex,
  Button,
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputProps,
  InputRightElement,
} from '@chakra-ui/react';
import { FieldHookConfig, useField } from 'formik';
import React, { forwardRef, ReactNode } from 'react';
import { useToggle } from 'react-use';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

type TextInputProps = {
  label?: string | JSX.Element;
  labelStyles?: object;
  helperText?: string | JSX.Element;
  isClearable?: boolean;
  addCheckIfNotEmpty?: boolean;
  leftElement?: {
    props?: InputProps;
    element: ReactNode;
  };
  rightElement?: {
    props?: InputProps;
    element: ReactNode;
  };
} & FieldHookConfig<string> &
  Omit<FormControlProps, 'label'> &
  InputProps;

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      label,
      helperText,
      leftElement,
      rightElement,
      isClearable,
      isReadOnly,
      isRequired,
      isDisabled,
      fontSize,
      size,
      type,
      addCheckIfNotEmpty,
        labelStyles,
      ...props
    },
    ref
  ) => {
    const [field, meta, handlers] = useField(props);
    const [show, toggleShow] = useToggle(type !== 'password');

    // @ts-ignore
    return (
      <>
        <FormControl
          isInvalid={(meta.error && meta.touched) || undefined}
          {...{ isRequired, isDisabled, isReadOnly, fontSize }}
          zIndex={1}
        >
          <Flex flexDir="row">
              <FormLabel htmlFor={props.name} style={labelStyles} mr="5px">{label}</FormLabel>
              {props.required &&
                  <span style={{color: "red"}}>*</span>
              }
          </Flex>
          <InputGroup size={size}>
            <Input
              ref={ref}
              id={props.name}
              type={type === 'number' ? 'number' : type === 'radio' ? 'radio' : (show ? 'text' : 'password')}
              rounded="base"
              {...field}
              {...(props as any)}
            />
            {type === 'password' && field.value && (
              <InputRightElement h={'full'}>
                <Button variant={'ghost'} onClick={toggleShow}>
                  {show ? <ViewIcon /> : <ViewOffIcon />}
                </Button>
              </InputRightElement>
            )}
            {leftElement && (
              <InputLeftElement {...(leftElement.props || {})}>
                {leftElement.element}
              </InputLeftElement>
            )}

            {rightElement && (
              <InputRightElement {...(rightElement.props || {})}>
                {rightElement.element}
              </InputRightElement>
            )}
          </InputGroup>

          <FormErrorMessage>{meta.error}</FormErrorMessage>
          {helperText && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
      </>
    );
  }
);
