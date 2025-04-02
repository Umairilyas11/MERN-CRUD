import { Box, Heading, HStack, IconButton, Image, Text } from '@chakra-ui/react'
import React from 'react'
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { TbEdit } from 'react-icons/tb';
import { useColorModeValue } from './ui/color-mode';
import { useProductStore } from '../store/product';
import { toaster } from './ui/toaster';

const ProductCard = ({product}) => {
    const textColor = useColorModeValue("gray.600", "gray.200");
    const bg = useColorModeValue("white", "gray.800");

    const {deleteProduct} = useProductStore();
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
            <IconButton colorPalette={"blue"}><TbEdit/></IconButton>
            <IconButton colorPalette={"red"} onClick={() => handleDeleteProduct(product._id)}><RiDeleteBin5Fill/></IconButton>    
        </HStack>
        </Box>

        
    </Box>
  )
}

export default ProductCard
