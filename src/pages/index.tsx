import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import Lottie from 'react-lottie-player'
import  animationData from '../../assets/lottie/79585-man-with-task.json'
import  ufo from '../../assets/lottie/75960-ridiculous-ufo.json'


import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Flex,
  Input,
  Text,
  StackDivider,
  Heading,
  Stack,
  Card, CardHeader, CardBody, CardFooter
} from '@chakra-ui/react'
const inter = Inter({ subsets: ['latin'] });
import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Textarea

} from '@chakra-ui/react'

let counter = 0;

export default function Home() {
  const [data, setData] = useState({ title: "", description: "" });

  const [tasks, setTasks]: any[] = useState([]);
  const [doneTasks, setDoneTasks]: any[] = useState([]);
  const [showDoneTasks, setShowDoneTasks] = useState(false);
  const [showTasks, setShowTasks] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [taskId, setTaskId] = useState(0); // set Task id for update



  const { isOpen, onOpen, onClose } = useDisclosure()


  // const handleChange = (event: any) => setTitle(event.target.value);

  // const handleChange = (event: any) => setTitle(event.target.value);


  // console.log(data);

  function deleteTask(id: number) {
    const remainingData = tasks.filter((item: any) => item.id !== id);
    setTasks([...remainingData]);


  }

  function getChakraCard() {
    return (
      <Card >
        <CardHeader>
          <Heading size='md'>Client Report</Heading>
        </CardHeader>

        <CardBody>
          <Stack divider={<StackDivider />} spacing='4'>
            <Box>
              <Heading size='xs' textTransform='uppercase'>
                Summary
              </Heading>
              <Text pt='2' fontSize='sm'>
                View a summary of all your clients over the last month.
              </Text>
            </Box>
            <Box>
              <Heading size='xs' textTransform='uppercase'>
                Overview
              </Heading>
              <Text pt='2' fontSize='sm'>
                Check out the overview of your clients.
              </Text>
            </Box>
            <Box>
              <Heading size='xs' textTransform='uppercase'>
                Analysis
              </Heading>
              <Text pt='2' fontSize='sm'>
                See a detailed analysis of all your business clients.
              </Text>
            </Box>
          </Stack>
        </CardBody>
      </Card>
    )
  }

  function getBootstrapCard(item: { id: number, title: string, description: string }) {
    return (
      <div key={item.id} className="card" style={{ width: "20rem", height: '10.5rem', margin: 10, padding: 0 }}>
        <div className="card-body">
          <h1 style={{ color: 'black', fontWeight: 'bold' }}>Title</h1>
          <h5 className="card-title" style={{ color: 'black' }}>{item.title}</h5>

          <h1 style={{ color: 'grey', }}>Description</h1>

          <p className="card-text"> {item.description}</p>
          <div className="d-flex flex-row-reverse" style={{ marginTop: 10 }}>

          {showDoneTasks &&   <button type="button" className="btn btn-light" style={{ marginLeft: 5,backgroundColor:'grey' ,color:'white',
        
        fontStyle:'italic'
        }}>Done</button>}

          {showTasks &&   <button type="button" className="btn btn-success" style={{ marginLeft: 5 }} onClick={()=>{
               deleteTask(item.id);
              setDoneTasks([item]);

            }}>Done</button>}

            {showTasks && <button type="button" className="btn btn-danger" style={{ marginLeft: 5 }} onClick={() => deleteTask(item.id)}>Delete</button>}
            
      { showTasks &&      <button type="button" className="btn btn-primary" onClick={() => {
              setData({
                title: item.title,
                description: item.description,

              });
              setTaskId(item.id);
              setIsUpdate(true);
              onOpen();
            }}>Edit</button>}


          </div>

        </div>
      </div>
    )
  }


  function openModal() {
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{isUpdate ? 'Update' : 'Add'} Task</ModalHeader>
          <ModalCloseButton />
          <ModalBody >

            <Input
      
              autoFocus
              value={data.title}
              onChange={(event) => setData({ ...data, title: event.target.value })}
              placeholder='Give Title of Your Task'
              style={{ marginBottom: 15 }}


            />

            <Textarea
              value={data.description}
              onChange={(event) => setData({ ...data, description: event.target.value })}

              placeholder='Description' />

          </ModalBody>

          <ModalFooter style={{ justifyContent: 'center' }}>

            <Button onClick={() => {
              isUpdate ? updateTask() : addTask()


            }} colorScheme='green' paddingRight={10} paddingLeft={10} >{isUpdate ? 'Update' : 'Add Task'}</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    )
  }

  function addTask() {
    ++counter;
    setTasks([{ id: counter, ...data }, ...tasks]);
    setData({ title: "", description: "" });
    setShowTasks(true);
    setShowDoneTasks(false);

    onClose();
  }

  async function updateTask() {




    const updatedData = tasks.map((item: any) => {
      if (item.id === taskId) {
        return { id: item.id, ...data }
      }
      return item
    });

    //console.log(updatedData);

    setTasks([...updatedData]);





    console.log('update Data', updatedData);
    // tasks[0]={id:taskId,data};
    // setTasks([...tasks]);
    // await setTasks([(current:any)=>{
    //   current.map((item:any)=>{
    //     if(item.id===taskId){

    //       return {id:taskId,...data}
    //     }
    //     return item
    //   })
    // }]);
    setData({ title: "", description: "" });
    onClose();
  }


  function ShowData (){

if(showDoneTasks){
 return(
  <div className='row '>
  {doneTasks.length>0 ? doneTasks.map((item: any) => {

    return (

      getBootstrapCard(item)


    )

  }): <div style={{display:'flex',alignItems:'center',flexDirection:'column'}}>
  <Lottie
loop
animationData={ufo}
play
style={{ width: '100%', height: '25%' }}
/><p style={{color:'black',fontSize:18,margin:25,}}>No Done Tasks</p>
 </div>}
  </div>
 )
}
else if (showTasks){
  return(
    <div className='row '>

        

    {tasks.length>0 ? tasks.map((item: any) => {

      return (

        getBootstrapCard(item)


      )

    }):        


    <div style={{display:'flex',alignItems:'center',flexDirection:'column'}}>
       <Lottie
    loop
    animationData={ufo}
    play
    style={{ width: '100%', height: '25%' }}
   /><p style={{color:'black',fontSize:18,margin:25,}}>No Tasks</p>
      </div>
    
    
    }

  </div>)

}

  
    else{
      return(
        <Lottie
 loop
 animationData={animationData}
 play
 style={{ width: '100%', height: '50%' }}
/>
      )
    }
    
  }





  return (


    <>
      <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#ffbe00', alignItems: 'center', justifyContent: 'center', padding: 10 }}>
        <h1 style={{ fontSize: 25, fontWeight: 'bold' }}>ToDo List Application</h1>
        <h2>Manage Your Rountins Here</h2>
      </div>



      {isOpen && openModal()}



      <div className="row" style={{height:'50%'}}>

        <div className="col-2" >
          <div className='row  m-2'>
          <button  type="button" 
          onClick={() => {
              setIsUpdate(false);
              setData({ title: "", description: "" });
      
              onOpen();

            }} 
            className="btn btn-outline-warning">Add Task</button>

          </div>
          <div className='row m-2'>

          <button type="button" className="btn btn-primary" onClick={()=> {
            setShowTasks(true);
            setShowDoneTasks(false);
            
            }}>Tasks</button>

          </div>


          <div className="row m-2">

          <button type="button" className="btn btn-success" onClick={()=> 
            {
              setShowDoneTasks(true)
              setShowTasks(false);
            
            }
            
            
            }>Done Tasks</button>
          </div>


        </div>



        <div className="col  bg-light">

          {
            ShowData()
          }

       

         
        </div>

      </div>











    </>




  )
}
