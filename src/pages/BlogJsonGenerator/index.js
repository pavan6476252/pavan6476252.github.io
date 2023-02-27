import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Code,
  Button,
  Alert,
  useDisclosure,
  Modal,
  ModalHeader,
  ModalOverlay,
  ModalCloseButton,
  ModalFooter,
  ModalBody,
  ModalContent,
} from '@chakra-ui/react';

import { useState } from 'react';
import Navbar from '../../utility/navBar';

export default function BlogJsonGenerator() {
  //field states
  // const [email, setEmail] = useState('');
  const [title, setTitle] = useState('');
  const [tagline, setTagline] = useState('');
  const [summary, setSummary] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [body, setBody] = useState('');
  //TODO : also take user auth and use name email and uId in json response

  //handle events
  //   const handleEmailChange = e => setEmail(e.target.value);
  const handleTitleChange = e => setTitle(e.target.value);
  const handleTaglineChange = e => setTagline(e.target.value);
  const handleSummaryChange = e => setSummary(e.target.value);
  const handleimageUrlChange = e => setImageUrl(e.target.value);
  const handleBodyChange = e => setBody(e.target.value);

  // error handling

  //   const isEmailError = email==='';
  const isTitleError = title === '';
  const isTaglineError = tagline === '';
  const isSummaryError = summary === '';
  const isImageurlError = imageUrl === '';
  const isBodyError = body === '';

  const [jsonArticle, setJsonArticle] = useState({});
  const handleSubmit = event => {
    event.preventDefault();
    const article = {
      title: title,
      // date: date,
      tagline: tagline,
      summary: summary,
      imageUrl: imageUrl,
      body: body,
    };
    const jsonArticleString = JSON.stringify(article);
    setJsonArticle(jsonArticleString);

    onOpen();
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Navbar />
      <Flex width="full" align="center" justifyContent="center">
        <Box
          p={8}
          maxWidth="800px"
          w="80%"
          borderWidth={1}
          borderRadius={8}
          boxShadow="lg"
        >
          <Box textAlign="center">
            <Heading>Blog Json Generator</Heading>
          </Box>
          <Box my={4} textAlign="left">
            <form>
              <FormControl isRequired>
                <FormLabel>Title</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter title"
                  onChange={e => {
                    let v = e.target.value;
                    setTitle(v);
                  }}
                />
              </FormControl>
              <FormControl mt={6} isRequired>
                <FormLabel>TagLine</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter TagLine"
                  onChange={e => {
                    let v = e.target.value;
                    setTagline(v);
                  }}
                />
              </FormControl>
              <FormControl mt={6} isRequired>
                <FormLabel>Image Url</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter Image url : https://..."
                  onChange={e => {
                    let v = e.target.value;
                    setImageUrl(v);
                  }}
                />
              </FormControl>
              <FormControl mt={6} isRequired>
                <FormLabel>Body - MarkDown </FormLabel>
                <Textarea
                  type="text"
                  placeholder="Enter Body"
                  onChange={e => {
                    let v = e.target.value;
                    setBody(v);
                  }}
                />
              </FormControl>
              <FormControl mt={6} isRequired>
                <FormLabel>Summary</FormLabel>
                <Textarea
                  type="text"
                  placeholder="Enter Summary of page"
                  onChange={e => {
                    let v = e.target.value;
                    setSummary(v);
                  }}
                />
              </FormControl>
              <Button
                //   type="submit"
                variantColor="teal"
                variant="outline"
                width="full"
                mt={4}
                onClick={handleSubmit}
              >
                Generate json
              </Button>
            </form>

            {/* //model */}
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Modal Title</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  {/* <CodeBlock code={jsonArticle}/> */}
                  {jsonArticle}
                </ModalBody>

                <ModalFooter>
                  <Button colorScheme="blue" mr={3} onClick={onClose}>
                    Close
                  </Button>
                  <Button variant="ghost">Secondary Action</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </Box>
        </Box>
      </Flex>
    </>
  );
}
