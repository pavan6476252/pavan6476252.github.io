import React, { useState } from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Card,
  FormHelperText,
  Editable,
  EditablePreview,
  EditableInput,
  theme,
  Center,
} from '@chakra-ui/react';
import BlogJsonGenerator from './pages/BlogJsonGenerator';
import ThemeToggler from './utility/themeTogler';
import HomePage from './pages/Home';
import Footer from './pages/Home/footer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  const [email, setEmail] = useState('');
  const [title, setTitle] = useState('');
  const [tagline, setTagline] = useState('');
  const [summary, setSummary] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [body, setBody] = useState('');
  //TODO : also take user auth and use name email and uId in json response

  //handle events
  const handleEmailChange = e => setEmail(e.target.value);
  const handleTitleChange = e => setTitle(e.target.value);
  const handleTaglineChange = e => setTagline(e.target.value);
  const handleSummaryChange = e => setSummary(e.target.value);
  const handleimageUrlChange = e => setImageUrl(e.target.value);
  const handleBodyChange = e => setBody(e.target.value);
  // error handling
  const isTitleError = title==='';
  const isEmailError = email==='';
  const isTaglineError = tagline==='';
  const isSummaryError = summary==='';
  const isImageurlError = imageUrl==='';
  const isBodyError = body==='';
  return (
    <ChakraProvider theme={theme}>
      {/* <Box bg="#CBC3E3">
        <Center>
          <Box maxW="960px" mx="auto" w="80%" m="20px">
            <Card p="15px">
              <FormControl isInvalid={isError}>


                <FormLabel>Title</FormLabel>
                <Input
                  type="email"
                  value={title}
                  onChange={handleTitleChange}
                />
                {!isEmailError ? (
                  <FormHelperText>
                    Enter the email you'd like to receive the newsletter on.
                  </FormHelperText>
                ) : (
                  <FormErrorMessage>Email is required.</FormErrorMessage>
                )}
              </FormControl>
            </Card>
          </Box>
        </Center>
      </Box> */}

      <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<HomePage/>}/>
        <Route  path='/blog-json-generator' element={<BlogJsonGenerator/>}/>
        
      </Routes>
      </BrowserRouter>
    
    
    </ChakraProvider>
  );
}

export default App;
