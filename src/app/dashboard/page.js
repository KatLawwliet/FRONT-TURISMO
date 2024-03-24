
import Header from "./HeaderComponnent";
import MenuNavigate from "./MenuNavigateComponnent";

export default function Home() {

  return (
      <main>
          <div style={style.container}>
              <Header/>
              <MenuNavigate></MenuNavigate>
          </div>
      </main>

  )
}
const style = {
    container: {
        backgroundColor: '#e1e7f0',
        display: 'flex',
        flexDirection: 'column',
        height: '98vh',
        width: '100%'
    },
}