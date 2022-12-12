import { createStandaloneToast } from '@chakra-ui/react';

export function errorToast(errorTitle: string, errorDescription?: string) {
  const toast = createStandaloneToast();
  return toast({
    position: 'top-right',
    status: 'error',
    isClosable: true,
    title: errorTitle,
    description: errorDescription,
    duration: 3000,
  });
}