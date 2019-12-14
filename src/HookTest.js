import React, { useState, useEffect, useReducer, useContext } from "react";

function FruitList({ fruits, setFruit }) {
  return fruits.map(f => (
    <li key={f} onClick={() => setFruit(f)}>
      {f}
    </li>
  ));
}

function FruitAdd(props) {
  const [pname, setPname] = useState("");
  //拿到赋予的Context
  console.log(useContext(Context));
  const { dispatch } = useContext(Context);
  const onAddFruit = e => {
    if (e.key === "Enter") {
      dispatch({ type: "add", payload: pname });
      setPname("");
    }
  };
  return (
    <div>
      <input
        type="text"
        value={pname}
        onChange={e => setPname(e.target.value)}
        onKeyDown={onAddFruit}
      ></input>
    </div>
  );
}
//将状态移动至全局 多个组件都可以使用该状态
function fruitReducer(state, action) {
  switch (action.type) {
    case "init":
      return { ...state, list: action.payload };
    case "add":
      return { ...state, list: [...state.list, action.payload] };
    case "loading_start":
      return { ...state, loading: true };
    case "loading_end":
      return { ...state, loading: false };
    default:
      return state;
  }
}

const Context = React.createContext();

//判断方法是否是Promise
function isPromise(obj) {
  return (
    !!obj &&
    (typeof obj === "object" || typeof obj === "function") &&
    typeof obj.then === "function"
  );
}
//p是真实的数据
async function asyncFetch(p) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(p);
    }, 1000);
  });
}
//封装dispatch 使其支持处理异步函数
function wrapDispatch(dispatch) {
  return function(action) {
    if (isPromise(action.payload)) {
      dispatch({ type: "loading_start" });
      action.payload.then(v => {
        dispatch({ type: action.type, payload: v });
        dispatch({ type: "loading_end" });
      });
    } else {
      dispatch(action);
    }
  };
}

export default function HookTest() {
  //useState 参数时状态初始值
  //返回一个数组，第一个元素数状态变量，第二个元素是状态变更函数
  const [fruit, setFruit] = useState("草莓");
  // const [fruits,setFruits] = useState([])

  //从外部将状态导入进来    //参数一是相关的reducer,参数二是初始值
  //同步reducer的处理
  //const [fruits,dispatch] = useReducer(fruitReducer,[])
  //异步
  const [{ list: fruits, loading }, originDispatch] = useReducer(fruitReducer, {
    list: [],
    loading: false
  });
  //dispatch function(action)
  const dispatch = wrapDispatch(originDispatch);
  //异步数据的获取 可以有加载态
  //第二个参数是个依赖,只有当里面的值改变时，才出发回调函数 比如分页的时候 根据第一几页进行数据的获取
  //若没有依赖，设置一个空数组，表示只执行一次
  useEffect(() => {
    console.log("get fruits");
    dispatch({ type: "init", payload: asyncFetch(["草莓", "香蕉"]) });

    // setTimeout(()=>{
    //   dispatch({type:'init',payload:['草莓','香蕉']})
    // },1000)
  }, []);
  //操作DOM元素 也是副作用
  useEffect(() => {
    document.title = fruit;
  }, [fruit]);
  //副作用的清除

  // useEffect(()=>{
  //    const timer= setInterval(()=>{
  //         console.log('应用启动了')
  //     },1000)

  //     //返回一个清除函数
  //     return function(){
  //         clearInterval(timer)
  //     }
  // },[fruit])

  //设置数组时，直接覆盖 更新一个全新的数组 ...fruits
  // 使用Provider包裹 则在所有的字组件都能够拿到传递的value值
  return (
    <Context.Provider value={{ fruits, dispatch }}>
      <div>
        <p>{fruit === "" ? "请选择喜爱的水果" : `您选择的水果是${fruit}`}</p>
        <FruitAdd />
        {loading ? (
          <div>'数据加载中...'</div>
        ) : (
          <ul>
            <FruitList fruits={fruits} setFruit={setFruit}></FruitList>
          </ul>
        )}
      </div>
    </Context.Provider>
  );
}
