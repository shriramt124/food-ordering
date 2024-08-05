 
import { Carousel } from 'antd';
const contentStyle = {
  height: '300px',
  color: '#fff',
  padding:"30px",
  background: '#06122a',
  display:"flex",
  flexDirection:"column",
  borderRadius:"15px",
  gap:"20px"
  
};
const Slider = () => (
  <Carousel autoplay>
    <div>
      <div style={contentStyle}>
        <p className='text-xl'>
       Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus ut eaque 
       rem harum quo assumenda vitae maiores quas eveniet error id nihil
        culpa saepe est deserunt mollitia sapiente, eligendi explicabo!
        </p>
        <div className='flex flex-col'>
          <h1 className='text-2xl capitalize'>john doe</h1>
          <p className='text-sm capitalize'>India</p>
        </div>
      </div>
    </div>
    <div>
    <div style={contentStyle}>
        <p className='text-xl'>
       Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus ut eaque 
       rem harum quo assumenda vitae maiores quas eveniet error id nihil
        culpa saepe est deserunt mollitia sapiente, eligendi explicabo!
        </p>
        <div className='flex flex-col'>
          <h1 className='text-2xl capitalize'>john doe</h1>
          <p className='text-sm capitalize'>India</p>
        </div>
      </div>
    </div>
    <div>
    <div style={contentStyle}>
        <p className='text-xl'>
       Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus ut eaque 
       rem harum quo assumenda vitae maiores quas eveniet error id nihil
        culpa saepe est deserunt mollitia sapiente, eligendi explicabo!
        </p>
        <div className='flex flex-col'>
          <h1 className='text-2xl capitalize'>john doe</h1>
          <p className='text-sm capitalize'>India</p>
        </div>
      </div>
    </div>
    <div>
    <div style={contentStyle}>
        <p className='text-xl'>
       Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus ut eaque 
       rem harum quo assumenda vitae maiores quas eveniet error id nihil
        culpa saepe est deserunt mollitia sapiente, eligendi explicabo!
        </p>
        <div className='flex flex-col'>
          <h1 className='text-2xl capitalize'>john doe</h1>
          <p className='text-sm capitalize'>India</p>
        </div>
      </div>
    </div>
  </Carousel>
);
export default Slider;