import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  Center,
  FormControl,
  FormLabel,
  Heading,
  useToast,
  Input,
  Stack,
} from '@chakra-ui/react';


function ViitJsonMaker() {
  const [inputCount, setInputCount] = useState(1);
  const [inputValues, setInputValues] = useState({});
  const [isLoading, setIsLoading] = useState(true);
//   const jsonLink = 'https://example.com/data.json';

  useEffect(() => {
    let data = prompt('please provide json file url');
    fetch(data)
      .then(response => response.json())
      .then(data => {
        setInputCount(Object.keys(data).length);
        setInputValues(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching JSON data: ', error);
        setIsLoading(false);
      });
  }, []);

  const handleAddInput = () => {
    setInputCount(inputCount + 1);
  };
  const handleRemoveInput = inputIndex => {
    const newInputValues = { ...inputValues };
    delete newInputValues[inputIndex];
    setInputValues(newInputValues);
    setInputCount(inputCount - 1);
  };

  const handleInputChange = (event, inputIndex, field) => {
    const newInputValues = { ...inputValues };
    newInputValues[inputIndex] = {
      ...newInputValues[inputIndex],
      [field]: event.target.value,
    };
    setInputValues(newInputValues);
  };

  const renderInputs = () => {
    let inputs = [];
    for (let i = 0; i < inputCount; i++) {
      inputs.push(
        <Box key={i}>
          <Card p={'10px'}>
            <FormControl mb={4}>
              <FormLabel>Input {i + 1} - Title 1</FormLabel>
              <Input
                placeholder={`Enter value for Input ${i + 1} - title`}
                onChange={event => handleInputChange(event, i, 'title')}
                value={inputValues[i]?.title ?? ''}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Input {i + 1} - Url</FormLabel>
              <Input
                placeholder={`Enter value for Input ${i + 1} - url`}
                onChange={event => handleInputChange(event, i, 'url')}
                value={inputValues[i]?.url ?? ''}
              />
            </FormControl>
            <Button
              mt={2}
              colorScheme="red"
              onClick={() => handleRemoveInput(i)}
            >
              Remove Input {i + 1}
            </Button>
          </Card>
        </Box>
      );
    }
    return inputs;
  };

  const handleSave = () => {
    const json = JSON.stringify(inputValues);
    // console.log(json); // Replace this with your own logic to save the JSON data

    // const json = JSON.stringify(inputValues);

    const blob = new Blob([json], { type: 'ViitJsonMakerlication/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'data.json';
    document.body.ViitJsonMakerendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    ToastExample();
  };
  function ToastExample() {
    const toast = useToast();

    toast({
      title: 'data file created',
      description: 'json file is successfully downloaded',
      status: 'success',
      duration: 9000,
      isClosable: true,
    });
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Box p={4}>
      <Center mb={'10px'}>
        <Heading as="h1" size="lg" noOfLines={1}>
          Json file creator for viit-ViitJsonMaker
        </Heading>
      </Center>

      <Stack spacing={4} mb={4}>
        {renderInputs()}
      </Stack>
      <Card p={'10px'}>
        <Button colorScheme="blue" onClick={handleAddInput}>
          Add Input
        </Button>
        <Button mt={4} onClick={handleSave}>
          Save
        </Button>
      </Card>
    </Box>
  );
}

export default ViitJsonMaker;
