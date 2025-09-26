import FormReport from '../pages/FormReport/FormReport'
import UploadExcelPage from '../pages/UploadExcelPage/UploadExcelPage'
import VisualizePage from '../pages/VisualizePage/VisualizePage'



const routes = [
    {
        path:"/",
        page:FormReport
    },
    {
        path:"/visualize-page",
        page:VisualizePage
    },
    {
        path:"/UploadExcelPage",
        page: UploadExcelPage
    }

]

export default routes