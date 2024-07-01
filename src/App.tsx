import { useEffect, useState } from 'react';
import { getLimits } from '@/services/credit-simulator/limits';
import { Button } from '@/components/ui/button.tsx';
import { Input } from '@/components/ui/input.tsx';

const App = () => {
  const [isValid, setIsValid] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [limits, setLimits] = useState<Limit>({
    min: 0,
    max: 0,
    currency: '',
  });
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [totalMonths, setTotalInstallments] = useState<number>(0);
  const [simulationResult, setSimulationResult] = useState({
    totalAmount: 0,
    totalMonths: 0,
  })
  useEffect(() => {
    getLimits().then(res => {
      setLimits(res.data);
      setTotalAmount(res.data.min);
    });
  }, []);


  const handlerTotalAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTotalAmount(Number(e.target.value));
  };

  const handlerTotalInstallments = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTotalInstallments(Number(e.target.value));
  };

  const validateSimulation = () => {
    if (totalAmount < limits.min || totalAmount > limits.max) {
      return false;
    }
    if (totalMonths < 3 || totalMonths > 12) {
      return false;
    }
    return true;
  };

  const submitSimulation = () => {
    if (validateSimulation()) {
      setIsValid(true);
      setSimulationResult({
        totalAmount,
        totalMonths,
      });
    }
  };

  return (
    <div className={'container mt-3'}>

      {currentStep === 0 ? (
        <div>
          <label>Total Amount</label>
          <Input
            className={totalAmount < limits.min || totalAmount > limits.max ? 'border-red-500' : ''}
            type={'number'}
            value={totalAmount}
            onChange={handlerTotalAmount} />
          {limits.min} <input type="range" min={limits.min} max={limits.max} onChange={handlerTotalAmount} value={totalAmount} /> {limits.max}
        </div>
      ) : (
        <div>
        <label>Total Months</label>
          <Input
            type={'number'}
            className={totalMonths < 3 || totalMonths > 12 ? 'border-red-500' : ''}
            value={totalMonths}
            onChange={handlerTotalInstallments} />
          3 <input type="range" min={3} max={12} onChange={handlerTotalInstallments} value={totalMonths} /> 12
        </div>
      )}
      {currentStep === 1 ? (<div className={'flex'}>
        <Button onClick={() => setCurrentStep(0)}>Back</Button>
        <Button onClick={submitSimulation}>Confirm</Button>
      </div>) : (<Button disabled={(totalAmount < limits.min || totalAmount > limits.max)} onClick={() => setCurrentStep(1)}>Next</Button>)}

      <span>{isValid && 'Simulated with success!'}</span>
      {isValid && (
        <div className={''}>
          <p>Total Amount: {simulationResult.totalAmount} {limits.currency}</p>
          <p>Total Months: {simulationResult.totalMonths}</p>
        </div>
      )}
    </div>
  );
};

export default App;
