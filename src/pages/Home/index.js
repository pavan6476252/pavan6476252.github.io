import { Box, Flex, Heading, Text, Card, Image, Button } from '@chakra-ui/react';

import { Link } from "react-router-dom";
import { FaExchangeAlt } from 'react-icons/fa';

import { LinkPreview } from '@dhaiwat10/react-link-preview';
import Navbar from '../../utility/navBar';
import Footer from './footer';
const tools = [
  {
    name: 'Blog Json Generator',
    description: 'By using this tool you can generate json object by filling blog form with title , summary , image url and body of the blog',
    link: '/blog-json-generator',
    icon: <FaExchangeAlt />,
  },
];
const projects = [
  'https://github.com/pavan6476252/viit',
  'https://github.com/pavan6476252/movies_react',
];
const myIntro =
  'Hello there! As someone who enjoys development and has experience with Android, web development [MERN Stack], and frameworks like React and Flutter, you have a wide range of skills and knowledge in the field of software engineering. You understand the importance of staying up-to-date with the latest technologies and are always eager to learn new things. Your expertise in various areas of development makes you a valuable asset to any team or project, and you have the ability to create high-quality, user-friendly applications that meet the needs of your clients or users. With your passion for development and dedication to delivering excellent results, you are well on your way to a successful career in the software industry.';

function HomePage() {
  return (
    <>
      <Navbar />

      <Flex
        // mt="10px"
        direction="column"
        align="center"
        justify="center"
        minH="100vh"
        px={4}
      >
        <Box maxW="700px">
          <Image
            src="profile.jpg"
            alt="Your Name"
            borderRadius="10px"
            boxSize="200px"
            minW={0}
            objectFit="cover"
          />

          <Heading as="h1" size="xl" my={4}>
            Pavan Kumar Meesala
          </Heading>
          <Text fontSize="xl" mb={8}>
            {myIntro}
          </Text>
          <Heading as="h5" fontSize={'3xl'} size="md" mb={4}>
            Tools
          </Heading>
          {tools.map((tool, index) => (
            <Card key={index} mb={4} p={5}>
              <Flex align="center">
                <Box fontSize="xl" mr={2}>
                  {tool.icon}
                </Box>
                <Heading size="m" mb={2}>
                  {tool.name}
                </Heading>
              </Flex>
              <Text mb={2}>{tool.description}</Text>
              <Button
                //   type="submit"
                variantColor="teal"
                variant="outline"
                width="full"
                mt={4}>

              <Link to={tool.link} color="blue.500" isExternal>
                View Tool
              </Link>
                </Button>
            </Card>
          ))}
          {/* repositories */}
          <Heading as="h2" fontSize={'3xl'} size="md" mb={4}>
            Projects
          </Heading>
          {projects.map((project, index) => (
            <Card key={index} mb={4} p={5}>
              <LinkPreview
                openInNewTab={true}
                cardSize="large"
                showGraphic={true}
                maxLine={2}
                minLine={1}
                url={project}
              />
            </Card>
          ))}
        </Box>
      </Flex>
      <Footer/>

    </>
  );
}

export default HomePage;
