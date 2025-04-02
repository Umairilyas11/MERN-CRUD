import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import React, { useState } from 'react'
import { Box } from '@chakra-ui/react';
import { useColorModeValue } from './../components/ui/color-mode';
import { useProductStore } from '../store/product';
import { toaster } from '../components/ui/toaster';

const CreatePage = () => {
 
  const [newProduct, setNewProduct] = useState({
    name:"",
    price:"",
    image:"",
  });
  
  const {createProduct}=useProductStore();
  const handleAddProduct = async() =>{
    const {success, message} =  await createProduct(newProduct);
    if(!success){
      toaster.create({
        title:"Error",
        type:"error",
        description : message,
        status :"error",
        isClosable:true
      })
      
    } else{
      toaster.create({
        title:"Success",
        type:"success",
        description : message,
        status :"success",
        isClosable:true
      })
     
    }
    setNewProduct({name:"", price:"",image: ""});
  }
  
  return (
    
    <Container maxW={"container.sm"}>
      <VStack
      gap={8}
      >
      <Heading as={"h1"} size={"2x1"} textAlign={"center"} mb={8}>
          Create New Product
      </Heading>
      <Box
      w={"full"}
      bg={useColorModeValue("white","gray.800")}
      p={6}
      rounded={"lg"} shadow={"md"}
      >
        <VStack gap={4}>
        <Input 
        placeholder="Product Name"
        name="name"
        border={'solid.1'}
        borderColor={"gray.500"}
        value={newProduct.name}
        onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
        />
        <Input 
        placeholder="Price"
        border={'solid.1'}
        borderColor={"gray.500"}
        name="price"
        type="number"
        value={newProduct.price}
        onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
        />
        <Input 
        placeholder="Image URL"
        name="image"
        border={'solid.1'}
        borderColor={"gray.500"}
        value={newProduct.image}
        onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
        />
        <Button colorScheme='blue' onClick={handleAddProduct} w='full'>Add Product</Button>
        
        </VStack>
      </Box>
      </VStack>

    </Container>
  )
}

export default CreatePage
