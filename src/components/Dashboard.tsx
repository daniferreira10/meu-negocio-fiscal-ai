import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { Card } from '@/components/ui/card';
import { Bell, Calendar, DollarSign, TrendingUp, AlertTriangle } from 'lucide-react';

// Sample data
const monthlyData = [{
  name: 'Jan',
  receitas: 12000,
  despesas: 8000
}, {
  name: 'Fev',
  receitas: 15000,
  despesas: 9000
}, {
  name: 'Mar',
  receitas: 18000,
  despesas: 12000
}, {
  name: 'Abr',
  receitas: 17000,
  despesas: 10000
}, {
  name: 'Mai',
  receitas: 22000,
  despesas: 15000
}, {
  name: 'Jun',
  receitas: 20000,
  despesas: 13000
}];
const expenseData = [{
  name: 'Aluguel',
  value: 3000
}, {
  name: 'Salários',
  value: 5000
}, {
  name: 'Insumos',
  value: 2500
}, {
  name: 'Marketing',
  value: 1500
}, {
  name: 'Outros',
  value: 1000
}];
const taxesDue = [{
  name: 'DAS',
  due: '20/05/2025',
  amount: 'R$ 567,89',
  status: 'pending'
}, {
  name: 'ISS',
  due: '10/05/2025',
  amount: 'R$ 234,45',
  status: 'pending'
}, {
  name: 'IRPJ',
  due: '30/05/2025',
  amount: 'R$ 1.245,67',
  status: 'pending'
}];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
const Dashboard = () => {
  const [currentMonth] = useState('Maio 2025');
  return <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-brand-dark">Dashboard Financeiro</h1>
          <p className="text-gray-600">Visão geral do mês de {currentMonth}</p>
        </div>
        <div className="flex space-x-2 mt-4 md:mt-0">
          <button className="flex items-center text-brand-blue border border-brand-blue rounded-md px-3 py-1 hover:bg-brand-light-blue">
            <Calendar className="w-4 h-4 mr-1" />
            <span>Mudar Período</span>
          </button>
          <button className="flex items-center bg-brand-blue text-white rounded-md px-3 py-1 hover:bg-brand-blue/90">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span className="">Analisar com IA</span>
          </button>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 mb-1 text-sm">Receitas do Mês</p>
              <h3 className="text-2xl font-bold text-brand-dark">R$ 22.000</h3>
              <p className="text-xs text-green-500 mt-1 flex items-center">
                <TrendingUp className="w-3 h-3 mr-1" />
                <span>+ 10% em relação ao mês anterior</span>
              </p>
            </div>
            <div className="bg-brand-light-green p-3 rounded-full">
              <DollarSign className="w-6 h-6 text-brand-green" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 mb-1 text-sm">Despesas do Mês</p>
              <h3 className="text-2xl font-bold text-brand-dark">R$ 15.000</h3>
              <p className="text-xs text-red-500 mt-1 flex items-center">
                <TrendingUp className="w-3 h-3 mr-1" />
                <span>+ 5% em relação ao mês anterior</span>
              </p>
            </div>
            <div className="bg-red-50 p-3 rounded-full">
              <DollarSign className="w-6 h-6 text-red-500" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 mb-1 text-sm">Lucro do Mês</p>
              <h3 className="text-2xl font-bold text-brand-dark">R$ 7.000</h3>
              <p className="text-xs text-green-500 mt-1 flex items-center">
                <TrendingUp className="w-3 h-3 mr-1" />
                <span>+ 15% em relação ao mês anterior</span>
              </p>
            </div>
            <div className="bg-brand-light-blue p-3 rounded-full">
              <TrendingUp className="w-6 h-6 text-brand-blue" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 mb-1 text-sm">Impostos a Pagar</p>
              <h3 className="text-2xl font-bold text-brand-dark">R$ 2.048,01</h3>
              <p className="text-xs text-amber-500 mt-1 flex items-center">
                <AlertTriangle className="w-3 h-3 mr-1" />
                <span>Próximo vencimento: 20/05</span>
              </p>
            </div>
            <div className="bg-amber-50 p-3 rounded-full">
              <Bell className="w-6 h-6 text-amber-500" />
            </div>
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-bold text-brand-dark mb-4">Receitas x Despesas</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData} margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5
            }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={value => `R$ ${value}`} />
                <Legend />
                <Bar dataKey="receitas" name="Receitas" fill="#0066CC" />
                <Bar dataKey="despesas" name="Despesas" fill="#FF6B6B" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-bold text-brand-dark mb-4">Composição das Despesas</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={expenseData} cx="50%" cy="50%" labelLine={false} outerRadius={100} fill="#8884d8" dataKey="value" label={({
                name,
                percent
              }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                  {expenseData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Tooltip formatter={value => `R$ ${value}`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Taxes and Obligations */}
      <Card className="p-6">
        <h3 className="text-lg font-bold text-brand-dark mb-4">Impostos e Obrigações</h3>
        <div className="overflow-x-auto">
          <table className="w-full min-w-full">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Imposto</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Vencimento</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Valor</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Status</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Ação</th>
              </tr>
            </thead>
            <tbody>
              {taxesDue.map((tax, index) => <tr key={index} className="border-b">
                  <td className="py-4 px-4 text-sm text-gray-900 font-medium">{tax.name}</td>
                  <td className="py-4 px-4 text-sm text-gray-500">{tax.due}</td>
                  <td className="py-4 px-4 text-sm text-gray-900">{tax.amount}</td>
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                      Pendente
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <button className="text-brand-blue hover:text-brand-blue/80 text-sm font-medium">
                      Gerar Guia
                    </button>
                  </td>
                </tr>)}
            </tbody>
          </table>
        </div>
      </Card>
    </div>;
};
export default Dashboard;