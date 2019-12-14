import React,{Component}from 'react'
import {Icon} from 'antd'
//高阶组件 扩展现有表单，提供控件包装、事件处理、表单校验

function kFormCreate(Comp){
    return class extends Component{
        constructor(props){
            super(props);
            //选项
            this.options = {};
            //数据
            this.state = {
                usernameMessage:'input your username',
                passwordMessage:'input your password',

            }
        }
        //对数据校验和设置
        handleChange=(e)=>{
            const {name,value} = e.target
            //收集表单数据
            this.setState({[name]:value},()=>{
                //单字段校验 setState可能是异步的
                this.validateField(name);
            })
            
        }
        validateField=(field)=>{
             const rules = this.options[field].rules;
             //some里面任何一项只要不通过，就返回true跳出，取反表示校验失败
             //isValid为true 则校验成功
             const isValid = !rules.some(rule=>{
                  if(rule.required){
                      if(!this.state[field]){
                          this.setState({
                              //根据usernameMessage 去返回校验失败错误信息
                              [field+'Message']:rule.message
                          })
                          return true;
                      }   
                  }return false
             })
             //校验成功
             if(isValid){
                 this.setState({
                     [field+'Message']:''
                 })
             }
             return isValid
        }
        //校验所有的字段
        validateFields=(cb)=>{
            const rets=Object.keys(this.options).map(field=>this.validateField(field))
           //每一项都为true,ret才为true
            const ret = rets.every(v=>v===true)
            cb(ret,this.state)
        }
        handleFocus=(e)=>{
            const field = e.target.name;
            this.setState({
                [field+'Focus']:true
            })    
        }
        isFieldTouched = field=>{
            return !!this.state[field+'Focus']
        }
        getFieldError= field=>{
            return this.state[field+'Message']
        }
        getFieldDec = (field,option)=>{
            //option怎么进行校验
            this.options[field] = option;
            return InputComp => (<div>
                      {/* 传递的InputComp是一个vdom 不能直接该属性 */}
                      {
                          React.cloneElement(InputComp,
                            {
                                name:field,
                                value:this.state[field] || '',
                                onChange:this.handleChange,//进行校验设置和设置状态
                                onFocus:this.handleFocus//焦点处理
                            })
                      }
            </div>)
        }
        render(){
            return <Comp 
            getFieldDec={this.getFieldDec} 
            validateFields={this.validateFields}
            getFieldError={this.getFieldError}
            isFieldTouched={this.isFieldTouched}
            >
            </Comp>
        }
       
    }
}

function FormItem(props){
      return (
          <>
           {props.children}
           { props.help && (<p style={{color:props.validateStatus === 'error'?'red':'green'}}>
               {props.help}
           </p>)}
          </>
      )
}

class KInput extends React.Component{
    render(){
        const {prefix,...rest} = this.props;
        return(
            <>
             {prefix}
             <input {...rest}></input>
            </>
        )
    }
}


@kFormCreate
class AntdForm extends Component{  
    constructor(props){
        super(props)
        this.state={
            unameError:'',
            upwdError:''

        }
    }

    onSubmit=(e)=>{
      this.props.validateFields((isValid,values)=>{
        console.log(values)
          if(isValid){
            
              alert('登录啦')
          }else{
              this.setState({
                unameError:values.usernameMessage,
                upwdError:values.passwordMessage
              })
          }
      })
    }
    render()
    {
        let {unameError,upwdError}=this.state
        const { getFieldDec,isFieldTouched,getFieldError } = this.props;
        //直接点击登录按钮时的验证

        if(unameError===''|| isFieldTouched('username'))
              unameError = isFieldTouched('username') && getFieldError('username')
        if(!upwdError==='' || isFieldTouched('password'))
              upwdError = isFieldTouched('password') && getFieldError('password')
              return(
            <div>
                <FormItem help={unameError}  validateStatus={"error"}>
                    {
                      getFieldDec('username',
                                {rules:[{required:true,message:'please input your username'}]}
                      )(<KInput type="text" prefix={<Icon type="user"/>}></KInput>)
                    }
                </FormItem>
               
                <FormItem help={upwdError}  validateStatus={"error"}>
                    {
                      getFieldDec('password',
                                {rules:[{required:true,message:'please input your password'}]}
                    )(<KInput type="password" prefix={<Icon type="lock"/>}></KInput>)
                    }
                </FormItem>
                
                <button onClick={this.onSubmit}>登录</button>
            </div>
            )
    }
        
}  
export default AntdForm
