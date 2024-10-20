import { Box,Heading,HStack,IconButton,Image,Modal,Text, useColorModeValue, useToast,  useDisclosure,ModalContent,ModalBody,ModalCloseButton,Button,ModalHeader,ModalFooter,VStack,Input,ModalOverlay } from "@chakra-ui/react"
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useProductStore } from "../store/product";
import { useState } from "react";
import { useRef } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react'


const ProductCard = ({product}) => {
  const textColor=useColorModeValue("gray.600","gray.200")
  const bg=useColorModeValue("white","gray.800")
  const {deleteProduct,updateProduct}=useProductStore()
  const toast=useToast()
  const handleDelete=async(pid)=>{
    const {success,message}=await deleteProduct(pid)
    if(success){
      toast({
        title:"Deleted Successfully",
        description:message,
        status:"success",
        isClosable:true
      })
   }
  }
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isOpen:isDialogOpen,onOpen:onDialogOpen,onClose:onDialogClose}=useDisclosure()
  const [updatedProduct,setUpdatedProduct]=useState(product)
  const handleUpdateProduct=async(pid,updatedProduct)=>{
   const {success,message}= await updateProduct(pid,updatedProduct)
   onClose()

   if(success){
    toast({
      title:"updated Successfully",
      description:message,
      status:"success",
      isClosable:true

    })
   }
  }
  const cancelRef = useRef()

  return (
    <Box
    shadow={"lg"}
    rounded={"lg"}
    overflow={"hidden"}
    transition={"all 0.3s"}
    _hover={{transform:"translateY(-5px)",shadow:"xl"}}
    bg={bg}
    >
        <Image src={product.image} alt={product.name} h={48} w="full" objectFit="cover" />
        <Box p={4}>
          <Heading as={"h3"} size={"md"} mb={2}>{product.name}</Heading>
          <Text fontWeight={"bold"} fontSize={"xl"}  mb={4} color={textColor}>₹{product.price}</Text>
          <HStack spacing={2}>
            <IconButton icon={<FaRegEdit />}  colorScheme="blue" onClick={onOpen} />
            <IconButton icon={<RiDeleteBin6Line />} colorScheme="red" onClick={onDialogOpen} />
          </HStack>
        </Box>
        <Modal  onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <VStack spacing={4}>
            <Input
            placeholder="Product Name"
            name="name"
            value={updatedProduct.name}
             onChange={(e)=>setUpdatedProduct({...updatedProduct,name:e.target.value})}
             />
               <Input
            placeholder="Price"
            name="price"
            type="number"
            value={updatedProduct.price}
            onChange={(e)=>setUpdatedProduct({...updatedProduct,price:e.target.value})}
           
             />
               <Input
            placeholder="Image URL"
            name="image"
            value={updatedProduct.image}
            onChange={(e)=>setUpdatedProduct({...updatedProduct,image:e.target.value})}
             />
          </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="green" me={3} onClick={()=>handleUpdateProduct(product._id,updatedProduct)}>Update</Button>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>

        </Modal>
        <AlertDialog
        isOpen={isDialogOpen}
        leastDestructiveRef={cancelRef}
        onClose={onDialogClose}
        isCentered
      >
         <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete Customer
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You cannot undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onDialogClose}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={()=>handleDelete(product._id)} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
          </AlertDialogOverlay>
        
      </AlertDialog>


    </Box>
  )
}

export default ProductCard
// onClick={onOpen}
// onClick={()=>handleDelete(product._id)} 