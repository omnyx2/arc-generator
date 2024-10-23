import React, { useState, useRef } from 'react';
import { GripVertical, X, Plus, Edit2, Check, Move } from 'lucide-react';

// Custom Card Component
const Card = ({ children, className = '', ...props }) => (
  <div className={`bg-white rounded-lg shadow-md ${className}`} {...props}>
    {children}
  </div>
);

const CardHeader = ({ children, className = '' }) => (
  <div className={`p-4 border-b ${className}`}>{children}</div>
);

const CardTitle = ({ children, className = '' }) => (
  <h3 className={`text-lg font-semibold ${className}`}>{children}</h3>
);

const CardContent = ({ children, className = '' }) => (
  <div className={`p-4 ${className}`}>{children}</div>
);

// Drop Zone Component
const DropZone = ({ active, children }) => (
  <div className={`
    transition-all duration-200 
    ${active ? 'border-2 border-blue-400 bg-blue-50' : 'border-2 border-transparent'}
  `}>
    {children}
  </div>
);

const DraggableCards = () => {
  const [columns, setColumns] = useState({
    'todo': [
      { id: 1, title: 'Card 1', content: 'Content for card 1' },
      { id: 2, title: 'Card 2', content: 'Content for card 2' },
    ],
    'in-progress': [
      { id: 3, title: 'Card 3', content: 'Content for card 3' },
    ],
  });

  const [editingColumn, setEditingColumn] = useState(null);
  const [newColumnTitle, setNewColumnTitle] = useState('');
  const [draggedItem, setDraggedItem] = useState(null);
  const [draggedColumn, setDraggedColumn] = useState(null);
  const [dropTarget, setDropTarget] = useState({ type: null, id: null });
  const [newCardData, setNewCardData] = useState({ title: '', content: '' });
  const [showNewCardForm, setShowNewCardForm] = useState({});

  // Refs for tracking drag state
  const dragNode = useRef();
  const dragType = useRef(null);

  const handleDragStart = (e, type, item, columnId) => {
    e.stopPropagation();
    dragNode.current = e.target;
    dragType.current = type;
    
    if (type === 'card') {
      setDraggedItem(item);
      setDraggedColumn(columnId);
    } else if (type === 'column') {
      setDraggedColumn(columnId);
    }

    e.dataTransfer.setData('text/plain', ''); // Required for Firefox
    setTimeout(() => {
      e.target.style.opacity = '0.5';
    }, 0);
  };

  const handleDragEnd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (dragNode.current) {
      dragNode.current.style.opacity = '1';
    }
    
    setDraggedItem(null);
    setDraggedColumn(null);
    setDropTarget({ type: null, id: null });
    dragNode.current = null;
    dragType.current = null;
  };

  const handleDragOver = (e, type, id) => {
    e.preventDefault();
    e.stopPropagation();

    if (!draggedItem && !draggedColumn) return;

    setDropTarget({ type, id });
  };

  const handleDrop = (e, targetType, targetId, targetColumnId) => {
    e.preventDefault();
    e.stopPropagation();

    if (!dragType.current) return;

    if (dragType.current === 'card' && draggedItem && targetColumnId) {
      const newColumns = { ...columns };
      
      // Remove card from source column
      newColumns[draggedColumn] = newColumns[draggedColumn].filter(
        card => card.id !== draggedItem.id
      );

      // Add card to target column
      if (targetType === 'card') {
        const targetIndex = newColumns[targetColumnId].findIndex(
          card => card.id === targetId
        );
        newColumns[targetColumnId].splice(targetIndex, 0, draggedItem);
      } else {
        newColumns[targetColumnId].push(draggedItem);
      }
      
      setColumns(newColumns);
    } 
    else if (dragType.current === 'column' && draggedColumn && targetType === 'column') {
      const columnEntries = Object.entries(columns);
      const fromIndex = columnEntries.findIndex(([id]) => id === draggedColumn);
      const toIndex = columnEntries.findIndex(([id]) => id === targetId);

      if (fromIndex !== toIndex) {
        columnEntries.splice(toIndex, 0, columnEntries.splice(fromIndex, 1)[0]);
        setColumns(Object.fromEntries(columnEntries));
      }
    }

    handleDragEnd(e);
  };

  // Column CRUD operations
  const addNewColumn = () => {
    const columnId = `new-column-${Object.keys(columns).length + 1}`;
    setColumns(prev => ({
      ...prev,
      [columnId]: []
    }));
    setEditingColumn(columnId);
    setNewColumnTitle(columnId);
  };

  const updateColumnTitle = (columnId) => {
    if (newColumnTitle.trim() === '') return;
    
    const newColumns = { ...columns };
    const columnContent = newColumns[columnId];
    delete newColumns[columnId];
    newColumns[newColumnTitle.trim()] = columnContent;
    
    setColumns(newColumns);
    setEditingColumn(null);
    setNewColumnTitle('');
  };

  const deleteColumn = (columnId) => {
    const newColumns = { ...columns };
    delete newColumns[columnId];
    setColumns(newColumns);
  };

  // Card CRUD operations
  const addNewCard = (columnId) => {
    if (newCardData.title.trim() === '' || newCardData.content.trim() === '') return;
    
    const newCard = {
      id: Math.max(0, ...Object.values(columns).flat().map(card => card.id)) + 1,
      title: newCardData.title,
      content: newCardData.content
    };

    setColumns(prev => ({
      ...prev,
      [columnId]: [...prev[columnId], newCard]
    }));

    setNewCardData({ title: '', content: '' });
    setShowNewCardForm(prev => ({ ...prev, [columnId]: false }));
  };

  return (
    <div className="w-full p-4">
      <div className="mb-4">
        <button
          onClick={addNewColumn}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600"
        >
          <Plus className="h-4 w-4" /> Add New List
        </button>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {Object.entries(columns).map(([columnId, cards]) => (
          <div
            key={columnId}
            draggable
            onDragStart={(e) => handleDragStart(e, 'column', null, columnId)}
            onDragEnd={handleDragEnd}
            onDragOver={(e) => handleDragOver(e, 'column', columnId)}
            onDrop={(e) => handleDrop(e, 'column', columnId)}
            className="relative"
          >
            <DropZone active={dropTarget.type === 'column' && dropTarget.id === columnId}>
              <div className="bg-gray-100 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  {editingColumn === columnId ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={newColumnTitle}
                        onChange={(e) => setNewColumnTitle(e.target.value)}
                        className="px-2 py-1 rounded border"
                        autoFocus
                      />
                      <button
                        onClick={() => updateColumnTitle(columnId)}
                        className="p-1 hover:bg-green-100 rounded-full"
                      >
                        <Check className="h-4 w-4 text-green-500" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Move className="h-5 w-5 text-gray-400 cursor-move" />
                      <h2 className="text-xl font-bold capitalize">
                        {columnId.replace('-', ' ')}
                      </h2>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setEditingColumn(columnId);
                        setNewColumnTitle(columnId);
                      }}
                      className="p-1 hover:bg-blue-100 rounded-full"
                    >
                      <Edit2 className="h-4 w-4 text-blue-500" />
                    </button>
                    <button
                      onClick={() => deleteColumn(columnId)}
                      className="p-1 hover:bg-red-100 rounded-full"
                    >
                      <X className="h-4 w-4 text-red-500" />
                    </button>
                  </div>
                </div>

                <div 
                  className="card-container space-y-4"
                  onDragOver={(e) => handleDragOver(e, 'column-content', columnId)}
                  onDrop={(e) => handleDrop(e, 'column-content', null, columnId)}
                >
                  {cards.map((card) => (
                    <div
                      key={card.id}
                      onDragOver={(e) => handleDragOver(e, 'card', card.id)}
                      onDrop={(e) => handleDrop(e, 'card', card.id, columnId)}
                    >
                      <DropZone active={dropTarget.type === 'card' && dropTarget.id === card.id}>
                        <Card
                          draggable
                          onDragStart={(e) => handleDragStart(e, 'card', card, columnId)}
                          onDragEnd={handleDragEnd}
                          className="cursor-move transition-all duration-200 hover:shadow-lg"
                        >
                          <CardHeader className="flex flex-row items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <GripVertical className="h-5 w-5 text-gray-400" />
                              <CardTitle>{card.title}</CardTitle>
                            </div>
                            <button
                              onClick={() => {
                                const newColumns = { ...columns };
                                newColumns[columnId] = newColumns[columnId].filter(c => c.id !== card.id);
                                setColumns(newColumns);
                              }}
                              className="p-1 hover:bg-red-100 rounded-full"
                            >
                              <X className="h-4 w-4 text-red-500" />
                            </button>
                          </CardHeader>
                          <CardContent>{card.content}</CardContent>
                        </Card>
                      </DropZone>
                    </div>
                  ))}
                </div>

                {showNewCardForm[columnId] ? (
                  <div className="mt-4 bg-white p-4 rounded-lg shadow">
                    <input
                      type="text"
                      placeholder="Card Title"
                      value={newCardData.title}
                      onChange={(e) => setNewCardData(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full mb-2 px-3 py-2 border rounded"
                    />
                    <textarea
                      placeholder="Card Content"
                      value={newCardData.content}
                      onChange={(e) => setNewCardData(prev => ({ ...prev, content: e.target.value }))}
                      className="w-full mb-2 px-3 py-2 border rounded"
                      rows="3"
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setShowNewCardForm(prev => ({ ...prev, [columnId]: false }))}
                        className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => addNewCard(columnId)}
                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        Add Card
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowNewCardForm(prev => ({ ...prev, [columnId]: true }))}
                    className="mt-4 w-full py-2 text-gray-600 hover:bg-gray-200 rounded-lg flex items-center justify-center gap-2"
                  >
                    <Plus className="h-4 w-4" /> Add Card
                  </button>
                )}
              </div>
            </DropZone>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DraggableCards;