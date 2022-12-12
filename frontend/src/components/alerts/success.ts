import { createStandaloneToast } from '@chakra-ui/react';
export function successToast(successTitle: React.ReactNode, successDescription?: React.ReactNode) {
  const toast = createStandaloneToast();
  return toast({
    position: 'top-right',
    status: 'success',
    isClosable: true,
    title: successTitle,
    description: successDescription,
    duration: 3000
  });
}