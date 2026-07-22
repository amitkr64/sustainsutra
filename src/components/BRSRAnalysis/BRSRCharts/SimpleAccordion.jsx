import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronRight } from 'lucide-react';

const SimpleAccordion = ({ items, defaultOpen = 0, allowMultiple = false }) => {
  const [openItems, setOpenItems] = useState(
    defaultOpen !== undefined ? [defaultOpen] : []
  );

  const toggleItem = (index) => {
    if (allowMultiple) {
      setOpenItems(prev =>
        prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
      );
    } else {
      setOpenItems(prev => (prev.includes(index) ? [] : [index]));
    }
  };

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const isOpen = openItems.includes(index);
        const Icon = isOpen ? ChevronDown : ChevronRight;

        return (
          <div
            key={index}
            className="bg-navy-light/20 border border-white/10 rounded-xl overflow-hidden"
          >
            <button
              onClick={() => toggleItem(index)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center gap-3">
                {item.icon && (
                  <span className={`text-${item.color || 'gold'}-400`}>
                    {React.createElement(item.icon, { size: 20 })}
                  </span>
                )}
                <span className="font-semibold text-white">{item.title}</span>
                {item.subtitle && (
                  <span className="text-xs text-dimmed ml-2">{item.subtitle}</span>
                )}
              </div>
              <Icon size={20} className="text-dimmed" />
            </button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="p-4 border-t border-white/5 bg-navy/30">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

export { SimpleAccordion };
