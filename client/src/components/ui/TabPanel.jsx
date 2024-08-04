import { Tabs, TabList, TabPanels, Tab, TabPanel, useColorModeValue } from '@chakra-ui/react'
import { useState } from 'react'


export default function TabPanelui() {
    const colors = useColorModeValue(
      ['gray.900', 'grey.500', 'gray.500'],
      ['grey.900', 'grey.900', 'grey.900'],
    )
    const [tabIndex, setTabIndex] = useState(0)
    const bg = colors[tabIndex]
    return (
      <Tabs onChange={(index) => setTabIndex(index)} bg={bg}>
        <TabList>
          <Tab>Info</Tab>
          <Tab>Payment</Tab>
         
        </TabList>
        <TabPanels p='1rem' >
          <TabPanel>
            <form className='text-white flex flex-col gap-4 w-full '>
              <div className='flex flex-col gap-2'>
                <label htmlFor="fullname">
                    FullName :
                </label>
                <input type="text" placeholder='Full Name.' name='fullName' />
              </div>
              <div>
                <label htmlFor="email">
                    Email :
                </label>
                <input type="email" placeholder='Email..' name='email' />
              </div>
              <div>
                <label htmlFor="phoneNo">
                    phoneNo :
                </label>
                <input type="number" placeholder='Phone no.' name='phoneNo' />
              </div>
              <div>
                <label htmlFor="address">
                    address :
                </label>
                <input type="text" placeholder='address..' name='address' />
              </div>
            </form>
          </TabPanel>
          <TabPanel>Are 1, 2, 3</TabPanel>
          <TabPanel>Red, yellow and blue.</TabPanel>
        </TabPanels>
      </Tabs>
    )
  }