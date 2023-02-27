import { Box, Flex, Heading,  } from '@chakra-ui/react';

import ThemeToggler from './themeTogler';

function Navbar() {
  return (
    <Box borderBottom="1px" borderColor="gray.200" mb="10px">
      <Flex justifyContent="space-between" alignItems="center" paddingX={"20px"}>
        <Heading size="md">Pavan72362</Heading>
        <ThemeToggler />
      </Flex>
    </Box>
  );
}

export default Navbar;
