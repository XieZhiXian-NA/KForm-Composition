import React ,{Component,PureComponent} from 'react'

export default class CommentList extends Component{
    constructor(props){
        super(props)
        this.state={
            comments:[]
        }
    }
    componentDidMount(){
        setInterval(()=>{
            this.setState({
                comments:[
               {body:"react is very good",author:"xzx"},
               {body:"vue is very good", author:"xlx"}
           ]
            })
           
        },1000)
    }
    render(){
        return(
            <div>
                {this.state.comments.map((c,i)=>(
                  <Comment key={i} {...c}/>
                ))}
            </div>
        )
    }
}
// function Comment({data}){
//     // console.log(props)
//     //props是一个对象 里面包含传递过来的很多数据
//     console.log('dddd')
//     return (
//         <div>
//             <p>
//                 {data.body}
//             </p>
//             <p>
//                 {data.author}
//             </p>
            
//         </div>
//     )
// }
class Comment extends PureComponent{
    // console.log(props)
    //props是一个对象 里面包含传递过来的很多数据
    render(){
        //let {data} = this.props
        //通过传递值类型  使用pureComponent
        let {body,author} = this.props
        //还是会多次调用，因为浅比较 地址变了
        console.log('dddd')
        return (
        <div>
            <p>
                {body}
            </p>
            <p>
                {author}
            </p>
            
        </div>
    )
    } 
}