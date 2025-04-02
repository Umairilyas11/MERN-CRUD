import { Box, Heading, HStack, IconButton, Image, Text, CloseButton, Dialog, Portal, Button, Input, VStack, useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react'
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { TbEdit } from 'react-icons/tb';
import { useColorModeValue } from './ui/color-mode';
import { useProductStore } from '../store/product';
import { toaster } from './ui/toaster';

const ProductCard = ({product}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [updatedProduct, setUpdateProduct] = useState(product);
    const textColor = useColorModeValue("gray.600", "gray.200");
    const bg = useColorModeValue("white", "gray.800");

    const {deleteProduct, updateProduct} = useProductStore();
    const handleDeleteProduct = async (pid) => {
       const {success, message} = await deleteProduct(pid);
       if(!success) {
         toaster.create({
                title:"error",
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
    }


    const handleUpdateProduct = async (pid, updatedProduct) => {
      const {success, message} = await updateProduct(pid, updatedProduct);
      document.getElementById('cancel-button')?.click();
      if(!success) {
        toaster.create({
          title:"error",
          type:"error",
          description : message,
          status :"error",
          isClosable:true
        })
      } else{ 
        toaster.create({
          title:"Success",
          type:"success",
          description : "Product updated successfully",
          status :"success",
          isClosable:true
        })
      }
    };
  return (
    <Box
    shadow={"lg"}
    rounded={"lg"}
    overflow={"hidden"}
    transition={"all 0.3s"}
    _hover={{
      transform:"translateY(-5px)",
      shadow:"xl"
    }}
    bg={bg}
    >
        <Image src={product.image} alt={product.name} h={48} w='full' objectFit={"cover"}/>
        <Box p={4}>
            <Heading as={"h3"} size={"md"} mb={2}>
                {product.name}
            </Heading>
            <Text fontWeight={"bold"} fontSize={"xl"} color={textColor} mb={4}>
                    ${product.price}
                </Text>

        <HStack gap={2}>
        <Dialog.Root open={isOpen} onClose={onClose}>
      <Dialog.Trigger asChild>
      <IconButton colorPalette={"blue"}><TbEdit/></IconButton>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Update Products</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <VStack gap={4} >
             <Input placeholder='Product Name' name='name'
             value={updatedProduct.name} 
             onChange={(e) => setUpdateProduct({...updatedProduct, name:e.target.value})}
             />
            <Input placeholder='Product Price' name='price' 
            value={updatedProduct.price}
            onChange={(e) => setUpdateProduct({...updatedProduct, price:e.target.value})}
            />
            <Input placeholder='Image URL' name='image' value={updatedProduct.image} 
            onChange={(e) => setUpdateProduct({...updatedProduct, image:e.target.value})}
            />
            </VStack>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline" 
                 id="cancel-button"
                 >Cancel</Button>
              </Dialog.ActionTrigger>
              <Button
              onClick={() => handleUpdateProduct(product._id, updatedProduct)}
              >Update</Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
            
            <IconButton colorPalette={"red"} onClick={() => handleDeleteProduct(product._id)}><RiDeleteBin5Fill/></IconButton>    
        </HStack>
        </Box>

        
        
        
    </Box>
  )
}

export default ProductCard
