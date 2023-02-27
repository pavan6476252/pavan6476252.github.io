import { Box, Flex, Link, IconButton, Icon } from '@chakra-ui/react';
import { FaGithub, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { MoonIcon ,  } from '@chakra-ui/icons'

function Footer() {
  return (
    <Box as="footer" py={8} >
      <Flex align="center" justify="center">
        <Link href="https://github.com/pavan6476252" isExternal>
          <IconButton
            aria-label="GitHub"
            icon={<Icon as={FaGithub} />}
            variant="ghost"
            size="lg"
            fontSize='35px'
          />
        </Link>
        <Link href="https://twitter.com/Pavan_kumar_TG" isExternal>
          <IconButton
            aria-label="Twitter"
            icon={<Icon as={FaTwitter} />}
            variant="ghost"
            size="lg"
            fontSize='35px'
            ml="8px"
            mr="8px"


          />
        </Link>
        <Link href="https://www.linkedin.com/in/meesala-pavan-kumar-015472230/" isExternal>
          <IconButton
            aria-label="LinkedIn"
            icon={<Icon as={FaLinkedin} />}
            variant="ghost"
            size="lg"
            fontSize='35px'
            ml="8px"
            mr="8px"


          />
        </Link>
        <Link href="https://www.instagram.com/pavan_kumar_bluetick/" isExternal>
          <IconButton
            aria-label="Instagram"
            icon={<Icon as={FaInstagram} />}
            variant="ghost"
            fontSize='35px'
            size="lg"
            ml="8px"
            mr="8px"

          />
        </Link>
      </Flex>
    </Box>
  );
}

export default Footer;
