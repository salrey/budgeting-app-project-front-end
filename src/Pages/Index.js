import Transactions from "../Components/Transactions";

const Index = ({parentCallBack}) => {
  return (
    <div className="Index container p-5 my-5 bg-dark text-white text-center rounded">
      <h2>Budget Money</h2>
      <Transactions parentCallBack={parentCallBack}/>
    </div>
  );
}

export default Index;
