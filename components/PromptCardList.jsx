import PromptCard from "./PromptCard";



const PromptCardList = ({ data, handleTagClick }) => {

    return (
      <div className="mt-16 prompt_layout">
        {data.map((prompt) => ( 
            <PromptCard
              key={prompt._id}
              prompt={prompt}
              handleTagClick={handleTagClick}
            />
          ))}
      </div>
    );
  };

export default PromptCardList;