
import { Card, Typography } from 'antd'
import { useAuthStore } from '../store'
import { IoBagHandle } from "react-icons/io5";
import { IoIosStats } from "react-icons/io";
function HomePage() {
  const { user } = useAuthStore()
  return (
    <div>
      <Typography.Title level={4}>Welcome , {user?.firstName} </Typography.Title>

      <div style={{ display: "flex", gap: "1rem" }}>

        <div style={{ flex: 1, display: "flex", gap: "1rem", flexDirection: "column" }}>
          <div style={{ display: "flex", gap: "1rem" }}>
            <Card style={{ flex: 1,}}>
              <div style={{ display: "flex", gap: ".5rem" }}>
              <IoBagHandle style={{fontSize:"1.8rem",color:"green",background:"#9ADE7B",padding:"5px", borderRadius:"5px"}}/>
              <div style={{ display:"flex",  flexDirection: "column" }}>
                <span >Total Orders</span>
                <span style={{fontSize:"1.6rem",fontWeight:"bold"}}>78</span>
              </div>
              </div>
            </Card>
            <Card style={{ flex: 1,}}>
              <div style={{ display: "flex", gap: ".5rem" }}>
              <IoIosStats style={{fontSize:"1.8rem",color:"green",background:"#9ADE7B",padding:"5px", borderRadius:"5px"}}/>
              <div style={{ display:"flex",  flexDirection: "column" }}>
                <span >Total Sales</span>
                <span style={{fontSize:"1.6rem",fontWeight:"bold"}}>89878</span>
              </div>
              </div>
            </Card>
          </div>
          <Card></Card>
        </div>

        <Card style={{ flex: 1 }}>

        </Card>

      </div>

    </div>
  )
}

export default HomePage