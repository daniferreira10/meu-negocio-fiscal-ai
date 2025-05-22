import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { CpfFormValues } from '../types/cpfRegistrationTypes';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PlusCircle, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { CurrencyInput } from '@/components/ui/currency-input';

interface AssetsTabProps {
  form: UseFormReturn<CpfFormValues>;
  onNext: () => void;
  onPrevious: () => void;
}

const AssetsTab: React.FC<AssetsTabProps> = ({ form, onNext, onPrevious }) => {
  const addAsset = () => {
    const currentAssets = form.getValues().assets;
    form.setValue('assets', [...currentAssets, { description: '', value: 0 }]);
  };

  const removeAsset = (index: number) => {
    const currentAssets = form.getValues().assets;
    form.setValue('assets', currentAssets.filter((_, i) => i !== index));
  };

  const addDebt = () => {
    const currentDebts = form.getValues().debts;
    form.setValue('debts', [...currentDebts, { description: '', value: 0 }]);
  };

  const removeDebt = (index: number) => {
    const currentDebts = form.getValues().debts;
    form.setValue('debts', currentDebts.filter((_, i) => i !== index));
  };

  const handleNext = () => {
    // Verificar patrimônio
    const assets = form.getValues().assets;
    let isValid = true;
    
    // Validar cada patrimônio
    for (let i = 0; i < assets.length; i++) {
      if (!assets[i].description || assets[i].value < 0) {
        isValid = false;
        break;
      }
    }
    
    if (isValid) {
      onNext();
    } else {
      toast.error("Verifique os dados de patrimônio");
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium mb-2">Patrimônio</h3>
          <p className="text-sm text-gray-500 mb-4">
            Liste seus bens como imóveis, veículos e investimentos
          </p>
          
          {form.getValues().assets.map((_, index) => (
            <Card key={index} className="mb-4">
              <CardContent className="pt-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">Item {index + 1}</h4>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeAsset(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name={`assets.${index}.description`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Descrição</FormLabel>
                        <FormControl>
                          <Input placeholder="Apto, carro, investimento..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name={`assets.${index}.value`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Valor</FormLabel>
                        <FormControl>
                          <CurrencyInput 
                            placeholder="0,00"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
          
          <Button
            type="button"
            variant="outline"
            onClick={addAsset}
            className="w-full mt-2"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Adicionar Item
          </Button>
        </div>
        
        <div className="mt-8">
          <h3 className="text-lg font-medium mb-2">Dívidas</h3>
          <p className="text-sm text-gray-500 mb-4">
            Liste seus financiamentos e empréstimos
          </p>
          
          {form.getValues().debts.map((_, index) => (
            <Card key={index} className="mb-4">
              <CardContent className="pt-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">Dívida {index + 1}</h4>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeDebt(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name={`debts.${index}.description`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Descrição</FormLabel>
                        <FormControl>
                          <Input placeholder="Financiamento, empréstimo..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name={`debts.${index}.value`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Valor</FormLabel>
                        <FormControl>
                          <CurrencyInput 
                            placeholder="0,00"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
          
          <Button
            type="button"
            variant="outline"
            onClick={addDebt}
            className="w-full mt-2"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Adicionar Dívida
          </Button>
        </div>
      </div>
      
      <div className="flex justify-between pt-4">
        <Button 
          type="button" 
          variant="outline"
          onClick={onPrevious}
        >
          Voltar
        </Button>
        <Button 
          type="button" 
          onClick={handleNext}
          className="bg-brand-blue hover:bg-brand-blue/90 text-white"
        >
          Próximo
        </Button>
      </div>
    </div>
  );
};

export default AssetsTab;
