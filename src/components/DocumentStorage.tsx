
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { 
  FileText, 
  Upload, 
  FileArchive, 
  FileCog, 
  FileUp, 
  Search, 
  Calendar, 
  X,
  FileSpreadsheet
} from 'lucide-react';
import { toast } from 'sonner';

type Document = {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadDate: string;
  category: string;
  status: 'processed' | 'pending' | 'error';
};

const DocumentStorage = () => {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: '1',
      name: 'Nota Fiscal 1234.pdf',
      type: 'pdf',
      size: '256 KB',
      uploadDate: '12/05/2025',
      category: 'Nota Fiscal',
      status: 'processed'
    },
    {
      id: '2',
      name: 'Extrato Bancário Maio.xlsx',
      type: 'xlsx',
      size: '128 KB',
      uploadDate: '10/05/2025',
      category: 'Extrato Bancário',
      status: 'processed'
    },
    {
      id: '3',
      name: 'Contrato Aluguel.docx',
      type: 'docx',
      size: '512 KB',
      uploadDate: '05/05/2025',
      category: 'Contrato',
      status: 'processed'
    },
    {
      id: '4',
      name: 'Declaração IRPJ 2024.pdf',
      type: 'pdf',
      size: '1.2 MB',
      uploadDate: '01/05/2025',
      category: 'Imposto',
      status: 'pending'
    }
  ]);
  
  const [search, setSearch] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files: FileList) => {
    setUploading(true);
    
    // Simulate upload processing
    setTimeout(() => {
      const newDocs: Document[] = Array.from(files).map((file, index) => {
        const fileType = file.name.split('.').pop() || '';
        
        return {
          id: Date.now().toString() + index,
          name: file.name,
          type: fileType,
          size: formatFileSize(file.size),
          uploadDate: new Date().toLocaleDateString('pt-BR'),
          category: getCategoryFromFileType(fileType),
          status: 'pending'
        };
      });
      
      setDocuments(prev => [...newDocs, ...prev]);
      setUploading(false);
      
      // Show success toast
      toast.success(`${files.length} arquivo${files.length > 1 ? 's' : ''} enviado${files.length > 1 ? 's' : ''} com sucesso!`);
      
      // Simulate processing after upload
      setTimeout(() => {
        setDocuments(prev => 
          prev.map(doc => {
            if (doc.status === 'pending') {
              return { ...doc, status: 'processed' };
            }
            return doc;
          })
        );
        
        toast.info('Todos os documentos foram processados e organizados.');
      }, 3000);
    }, 1500);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(0) + ' KB';
    else if (bytes < 1073741824) return (bytes / 1048576).toFixed(1) + ' MB';
    else return (bytes / 1073741824).toFixed(2) + ' GB';
  };

  const getCategoryFromFileType = (fileType: string): string => {
    const fileTypes: {[key: string]: string} = {
      'pdf': 'Documento',
      'xlsx': 'Planilha',
      'xls': 'Planilha',
      'csv': 'Planilha',
      'docx': 'Documento',
      'doc': 'Documento',
      'jpg': 'Imagem',
      'jpeg': 'Imagem',
      'png': 'Imagem',
      'xml': 'XML',
      'txt': 'Texto'
    };
    
    return fileTypes[fileType.toLowerCase()] || 'Outro';
  };

  const getDocIcon = (fileType: string) => {
    switch(fileType.toLowerCase()) {
      case 'xlsx':
      case 'xls':
      case 'csv':
        return <FileSpreadsheet className="w-5 h-5 text-green-500" />;
      case 'pdf':
        return <FileText className="w-5 h-5 text-red-500" />;
      case 'docx':
      case 'doc':
        return <FileText className="w-5 h-5 text-blue-500" />;
      case 'zip':
      case 'rar':
        return <FileArchive className="w-5 h-5 text-yellow-500" />;
      default:
        return <FileCog className="w-5 h-5 text-gray-500" />;
    }
  };

  const filteredDocuments = documents.filter(doc =>
    doc.name.toLowerCase().includes(search.toLowerCase()) ||
    doc.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold text-brand-dark mb-6">Documentos</h2>
      
      <Tabs defaultValue="all">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <TabsList>
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="fiscal">Fiscais</TabsTrigger>
            <TabsTrigger value="bank">Bancários</TabsTrigger>
            <TabsTrigger value="contracts">Contratos</TabsTrigger>
          </TabsList>
          
          <div className="mt-4 md:mt-0 flex w-full md:w-auto">
            <div className="relative flex-grow md:flex-grow-0">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Buscar documentos..."
                className="pl-9 w-full md:w-[250px]"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Button className="ml-2 bg-brand-blue hover:bg-brand-blue/90">
              <Calendar className="mr-2 h-4 w-4" />
              Filtrar
            </Button>
          </div>
        </div>

        <TabsContent value="all" className="mt-0">
          {/* Upload Area */}
          <div 
            className={`border-2 border-dashed rounded-lg p-8 mb-6 text-center transition-colors ${
              dragActive ? 'border-brand-blue bg-brand-light-blue/20' : 'border-gray-300'
            }`}
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center justify-center">
              <div className="p-3 rounded-full bg-brand-light-blue mb-4">
                <Upload className="h-6 w-6 text-brand-blue" />
              </div>
              
              <h3 className="text-lg font-medium mb-2">
                {dragActive ? 'Solte seus arquivos aqui' : 'Arraste e solte seus documentos ou'}
              </h3>
              
              <label htmlFor="file-upload" className="cursor-pointer">
                <div className="bg-brand-blue text-white px-4 py-2 rounded-md hover:bg-brand-blue/90">
                  <FileUp className="inline-block w-4 h-4 mr-2" />
                  Selecionar Arquivos
                </div>
                <input
                  id="file-upload"
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                  accept=".pdf,.doc,.docx,.xlsx,.xls,.csv,.xml,.txt,.jpg,.jpeg,.png"
                />
              </label>
              
              <p className="text-sm text-gray-500 mt-2">
                Formatos suportados: PDF, DOCX, XLSX, CSV, XML, JPG, PNG
              </p>
            </div>
          </div>

          {uploading && (
            <div className="mb-6 p-4 bg-brand-light-blue/20 border border-brand-blue/30 rounded-md">
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-brand-blue mr-3"></div>
                <span>Enviando documentos, por favor aguarde...</span>
              </div>
            </div>
          )}

          {/* Documents List */}
          <div className="bg-white rounded-lg border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Documento</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tamanho</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoria</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredDocuments.length > 0 ? (
                    filteredDocuments.map((doc) => (
                      <tr key={doc.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0">{getDocIcon(doc.type)}</div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{doc.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doc.size}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doc.uploadDate}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doc.category}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {doc.status === 'processed' ? (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Processado
                            </span>
                          ) : doc.status === 'pending' ? (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                              Processando
                            </span>
                          ) : (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                              Erro
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Button variant="ghost" size="sm" onClick={() => toast.success(`Download do arquivo ${doc.name} iniciado.`)}>
                            Download
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-red-600 hover:text-red-800"
                            onClick={() => {
                              setDocuments(documents.filter(d => d.id !== doc.id));
                              toast.success(`Documento ${doc.name} removido com sucesso.`);
                            }}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-6 py-10 text-center text-gray-500">
                        {search ? (
                          <div>
                            <p>Nenhum documento encontrado para "{search}"</p>
                            <Button 
                              variant="link" 
                              className="text-brand-blue"
                              onClick={() => setSearch('')}
                            >
                              Limpar busca
                            </Button>
                          </div>
                        ) : (
                          <p>Nenhum documento disponível. Faça upload de novos arquivos.</p>
                        )}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="fiscal">
          <div className="bg-gray-50 rounded-lg p-6 text-center">
            <p className="mb-4">Visualize, organize e gerencie seus documentos fiscais</p>
            <Button onClick={() => toast.info("Funcionalidade avançada disponível no plano Premium")}>
              Importar Notas Fiscais Automático
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="bank">
          <div className="bg-gray-50 rounded-lg p-6 text-center">
            <p className="mb-4">Integração com bancos para importação automática de extratos</p>
            <Button onClick={() => toast.info("Funcionalidade avançada disponível no plano Premium")}>
              Conectar Conta Bancária
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="contracts">
          <div className="bg-gray-50 rounded-lg p-6 text-center">
            <p className="mb-4">Gerencie seus contratos e documentos importantes</p>
            <Button onClick={() => toast.info("Funcionalidade avançada disponível no plano Premium")}>
              Assinatura Digital
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default DocumentStorage;
