import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { HelpCircle, Plus, Edit, Trash2, Eye, EyeOff, X, Check, AlertCircle } from "lucide-react";

type QuestionType = "Multiple Choice" | "Multi Select" | "Rating Scale 1-5" | "Long Text" | "Scenario Based" | "Yes / No";
type Category = "Technical Skills" | "Soft Skills" | "Interests" | "Behavior" | "Work Style" | "Career Direction" | "Problem Solving";
type Status = "Active" | "Draft" | "Archived";

interface Question {
  id: number;
  question: string;
  category: Category;
  type: QuestionType;
  options?: string[];
  required: boolean;
  active: boolean;
  status: Status;
  weight: number;
  relatedSkills: string[];
}

export function AdminQuestions() {
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 1,
      question: "What programming languages are you most proficient in?",
      category: "Technical Skills",
      type: "Multiple Choice",
      options: ["Python", "JavaScript", "Java", "C++", "Go", "Rust"],
      required: true,
      active: true,
      status: "Active",
      weight: 8,
      relatedSkills: ["Python", "JavaScript"]
    },
    {
      id: 2,
      question: "Describe a challenging project you worked on and how you solved it.",
      category: "Problem Solving",
      type: "Long Text",
      required: true,
      active: true,
      status: "Active",
      weight: 7,
      relatedSkills: ["Problem Solving"]
    },
    {
      id: 3,
      question: "Rate your teamwork skills",
      category: "Soft Skills",
      type: "Rating Scale 1-5",
      required: true,
      active: true,
      status: "Active",
      weight: 6,
      relatedSkills: ["Teamwork"]
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [deletingQuestion, setDeletingQuestion] = useState<Question | null>(null);

  const [formData, setFormData] = useState({
    question: "",
    category: "Technical Skills" as Category,
    type: "Multiple Choice" as QuestionType,
    required: true,
    status: "Active" as Status,
    options: ["", ""],
    minLabel: "Not confident",
    maxLabel: "Very confident",
    placeholder: "",
    minChars: "",
    scenarioDescription: "",
    relatedSkills: [] as string[],
    weight: 5
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const resetForm = () => {
    setFormData({
      question: "",
      category: "Technical Skills",
      type: "Multiple Choice",
      required: true,
      status: "Active",
      options: ["", ""],
      minLabel: "Not confident",
      maxLabel: "Very confident",
      placeholder: "",
      minChars: "",
      scenarioDescription: "",
      relatedSkills: [],
      weight: 5
    });
    setErrors({});
  };

  const handleAddQuestion = () => {
    setShowAddModal(true);
    resetForm();
  };

  const handleEditQuestion = (q: Question) => {
    setEditingQuestion(q);
    setFormData({
      question: q.question,
      category: q.category,
      type: q.type,
      required: q.required,
      status: q.status,
      options: q.options || ["", ""],
      minLabel: "Not confident",
      maxLabel: "Very confident",
      placeholder: "",
      minChars: "",
      scenarioDescription: "",
      relatedSkills: q.relatedSkills,
      weight: q.weight
    });
    setShowEditModal(true);
  };

  const handleDeleteQuestion = (q: Question) => {
    setDeletingQuestion(q);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (deletingQuestion) {
      setQuestions(questions.filter(q => q.id !== deletingQuestion.id));
      setShowDeleteModal(false);
      setDeletingQuestion(null);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.question.trim()) {
      newErrors.question = "Question text is required.";
    }
    if (!formData.category) {
      newErrors.category = "Category is required.";
    }
    if (!formData.type) {
      newErrors.type = "Question type is required.";
    }
    if ((formData.type === "Multiple Choice" || formData.type === "Multi Select") && formData.options.filter(o => o.trim()).length < 2) {
      newErrors.options = "At least two options are required for multiple choice questions.";
    }
    if (formData.weight < 1 || formData.weight > 10) {
      newErrors.weight = "Weight must be between 1 and 10.";
    }
    if (formData.required && formData.status !== "Active") {
      newErrors.status = "Required questions must have active status before publishing.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveQuestion = () => {
    if (!validateForm()) return;

    const newQuestion: Question = {
      id: editingQuestion?.id || Date.now(),
      question: formData.question,
      category: formData.category,
      type: formData.type,
      options: (formData.type === "Multiple Choice" || formData.type === "Multi Select") ? formData.options.filter(o => o.trim()) : undefined,
      required: formData.required,
      active: formData.status === "Active",
      status: formData.status,
      weight: formData.weight,
      relatedSkills: formData.relatedSkills
    };

    if (editingQuestion) {
      setQuestions(questions.map(q => q.id === editingQuestion.id ? newQuestion : q));
      setShowEditModal(false);
      setEditingQuestion(null);
    } else {
      setQuestions([...questions, newQuestion]);
      setShowAddModal(false);
      setShowSuccessModal(true);
    }
  };

  const addOption = () => {
    setFormData({ ...formData, options: [...formData.options, ""] });
  };

  const removeOption = (index: number) => {
    setFormData({ ...formData, options: formData.options.filter((_, i) => i !== index) });
  };

  const updateOption = (index: number, value: string) => {
    const newOptions = [...formData.options];
    newOptions[index] = value;
    setFormData({ ...formData, options: newOptions });
  };

  const toggleSkill = (skill: string) => {
    if (formData.relatedSkills.includes(skill)) {
      setFormData({ ...formData, relatedSkills: formData.relatedSkills.filter(s => s !== skill) });
    } else {
      setFormData({ ...formData, relatedSkills: [...formData.relatedSkills, skill] });
    }
  };

  const skillOptions = ["React", "Python", "SQL", "Communication", "Teamwork", "Problem Solving", "Leadership", "Adaptability", "Fast Learner"];

  const QuestionFormModal = ({ isEdit }: { isEdit: boolean }) => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-[var(--bg-card)] rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-[var(--bg-card)] border-b border-[var(--border-main)] p-6 flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold">{isEdit ? "Edit Assessment Question" : "Add New Assessment Question"}</h2>
            <p className="text-[var(--text-muted)] text-sm mt-1">
              Create a question used to build student AI profiles and improve match accuracy.
            </p>
          </div>
          <button onClick={() => isEdit ? setShowEditModal(false) : setShowAddModal(false)} className="text-[var(--text-muted)] hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Question Text */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Question Text</label>
            <textarea
              className="w-full px-3 py-2 border rounded-md border-[var(--border-main)] bg-[var(--bg-main)] min-h-[80px]"
              placeholder="Write the assessment question..."
              value={formData.question}
              onChange={(e) => setFormData({ ...formData, question: e.target.value })}
            />
            {errors.question && <p className="text-sm text-red-500">{errors.question}</p>}
            <p className="text-xs text-[var(--text-muted)]">Example: Which frontend tools are you most comfortable using?</p>
          </div>

          {/* Category & Type */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <select
                className="w-full px-3 py-2 border rounded-md border-[var(--border-main)] bg-[var(--bg-main)]"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as Category })}
              >
                <option>Technical Skills</option>
                <option>Soft Skills</option>
                <option>Interests</option>
                <option>Behavior</option>
                <option>Work Style</option>
                <option>Career Direction</option>
                <option>Problem Solving</option>
              </select>
              {errors.category && <p className="text-sm text-red-500">{errors.category}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Question Type</label>
              <select
                className="w-full px-3 py-2 border rounded-md border-[var(--border-main)] bg-[var(--bg-main)]"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as QuestionType })}
              >
                <option>Multiple Choice</option>
                <option>Multi Select</option>
                <option>Rating Scale 1-5</option>
                <option>Long Text</option>
                <option>Scenario Based</option>
                <option>Yes / No</option>
              </select>
              {errors.type && <p className="text-sm text-red-500">{errors.type}</p>}
            </div>
          </div>

          {/* Required & Status */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Required</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={formData.required}
                    onChange={() => setFormData({ ...formData, required: true })}
                  />
                  <span className="text-sm">Required</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={!formData.required}
                    onChange={() => setFormData({ ...formData, required: false })}
                  />
                  <span className="text-sm">Optional</span>
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <select
                className="w-full px-3 py-2 border rounded-md border-[var(--border-main)] bg-[var(--bg-main)]"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as Status })}
              >
                <option>Active</option>
                <option>Draft</option>
                <option>Archived</option>
              </select>
              {errors.status && <p className="text-sm text-red-500">{errors.status}</p>}
            </div>
          </div>

          {/* Options Section - Dynamic based on type */}
          {(formData.type === "Multiple Choice" || formData.type === "Multi Select") && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Options</label>
              {formData.options.map((option, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    className="flex-1 px-3 py-2 border rounded-md border-[var(--border-main)] bg-[var(--bg-main)]"
                    placeholder={`Option ${index + 1}`}
                    value={option}
                    onChange={(e) => updateOption(index, e.target.value)}
                  />
                  {formData.options.length > 2 && (
                    <Button size="sm" variant="outline" onClick={() => removeOption(index)}>
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button size="sm" variant="outline" onClick={addOption} className="mt-2">
                <Plus className="w-4 h-4 mr-1" /> Add Option
              </Button>
              {errors.options && <p className="text-sm text-red-500">{errors.options}</p>}
            </div>
          )}

          {formData.type === "Rating Scale 1-5" && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Minimum Label</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-md border-[var(--border-main)] bg-[var(--bg-main)]"
                  value={formData.minLabel}
                  onChange={(e) => setFormData({ ...formData, minLabel: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Maximum Label</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-md border-[var(--border-main)] bg-[var(--bg-main)]"
                  value={formData.maxLabel}
                  onChange={(e) => setFormData({ ...formData, maxLabel: e.target.value })}
                />
              </div>
            </div>
          )}

          {formData.type === "Long Text" && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Placeholder Text</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-md border-[var(--border-main)] bg-[var(--bg-main)]"
                  value={formData.placeholder}
                  onChange={(e) => setFormData({ ...formData, placeholder: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Minimum Characters (optional)</label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border rounded-md border-[var(--border-main)] bg-[var(--bg-main)]"
                  value={formData.minChars}
                  onChange={(e) => setFormData({ ...formData, minChars: e.target.value })}
                />
              </div>
            </div>
          )}

          {formData.type === "Scenario Based" && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Scenario Description</label>
              <textarea
                className="w-full px-3 py-2 border rounded-md border-[var(--border-main)] bg-[var(--bg-main)] min-h-[80px]"
                value={formData.scenarioDescription}
                onChange={(e) => setFormData({ ...formData, scenarioDescription: e.target.value })}
              />
            </div>
          )}

          {/* Skill/Trait Mapping */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Related Skill or Trait</label>
            <div className="flex flex-wrap gap-2">
              {skillOptions.map((skill) => (
                <button
                  key={skill}
                  onClick={() => toggleSkill(skill)}
                  className={`px-3 py-1 rounded-full text-sm border ${
                    formData.relatedSkills.includes(skill)
                      ? "bg-blue-600 border-blue-600 text-white"
                      : "border-[var(--border-main)] text-[var(--text-muted)] hover:border-blue-500"
                  }`}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>

          {/* Weight */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Weight: {formData.weight}</label>
            <input
              type="range"
              min="1"
              max="10"
              className="w-full"
              value={formData.weight}
              onChange={(e) => setFormData({ ...formData, weight: parseInt(e.target.value) })}
            />
            <p className="text-xs text-[var(--text-muted)]">
              This weight affects how much the question influences student profile analysis and match score calculation.
            </p>
            {errors.weight && <p className="text-sm text-red-500">{errors.weight}</p>}
          </div>

          {/* Preview Section */}
          <div className="border border-[var(--border-main)] rounded-lg p-4 bg-[var(--bg-main)]">
            <p className="text-xs font-semibold text-[var(--text-muted)] mb-3">PREVIEW:</p>
            <div className="space-y-3">
              <p className="font-medium">{formData.question || "Question will appear here..."}</p>
              {(formData.type === "Multiple Choice" || formData.type === "Multi Select") && formData.options.filter(o => o.trim()).length > 0 && (
                <div className="space-y-2">
                  {formData.options.filter(o => o.trim()).map((opt, idx) => (
                    <label key={idx} className="flex items-center gap-2">
                      <input type={formData.type === "Multi Select" ? "checkbox" : "radio"} disabled />
                      <span className="text-sm">{opt}</span>
                    </label>
                  ))}
                </div>
              )}
              {formData.type === "Rating Scale 1-5" && (
                <div className="flex items-center gap-4">
                  <span className="text-xs text-[var(--text-muted)]">{formData.minLabel}</span>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map(n => (
                      <button key={n} className="w-8 h-8 rounded border border-[var(--border-main)] text-sm" disabled>
                        {n}
                      </button>
                    ))}
                  </div>
                  <span className="text-xs text-[var(--text-muted)]">{formData.maxLabel}</span>
                </div>
              )}
              {formData.type === "Long Text" && (
                <textarea className="w-full px-3 py-2 border rounded-md border-[var(--border-main)] bg-[var(--bg-secondary)]" placeholder={formData.placeholder || "Student response..."} disabled />
              )}
              {formData.type === "Yes / No" && (
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input type="radio" disabled />
                    <span className="text-sm">Yes</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" disabled />
                    <span className="text-sm">No</span>
                  </label>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 bg-[var(--bg-card)] border-t border-[var(--border-main)] p-6 flex gap-3 justify-end">
          <Button variant="outline" onClick={() => isEdit ? setShowEditModal(false) : setShowAddModal(false)}>
            Cancel
          </Button>
          <Button variant="outline" onClick={handleSaveQuestion}>
            Save as Draft
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleSaveQuestion}>
            {isEdit ? "Save Changes" : "Add Question"}
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Assessment Questions</h1>
          <p className="text-[var(--text-muted)]">Manage student profiling assessment questions.</p>
        </div>
        <Button onClick={handleAddQuestion} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white">
          <Plus className="w-4 h-4" />
          Add New Question
        </Button>
      </div>

      <div className="space-y-3">
        {questions.map((q) => (
          <Card key={q.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h4 className="font-bold text-lg mb-2">{q.question}</h4>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge variant="neutral">{q.category}</Badge>
                    <Badge variant="blue">{q.type}</Badge>
                    {q.required && <Badge variant="warning">Required</Badge>}
                    {q.active ? (
                      <Badge variant="success">Active</Badge>
                    ) : (
                      <Badge variant="default">Inactive</Badge>
                    )}
                  </div>
                  {q.options && (
                    <div className="p-3 bg-background dark:bg-gray-800/50 rounded-lg">
                      <p className="text-xs font-semibold text-[var(--text-muted)] mb-2">OPTIONS:</p>
                      <div className="flex flex-wrap gap-1">
                        {q.options.map((opt, idx) => (
                          <span key={idx} className="text-xs bg-card dark:bg-gray-700 px-2 py-1 rounded border border-[var(--border-main)]">
                            {opt}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleEditQuestion(q)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleDeleteQuestion(q)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Question Modal */}
      {showAddModal && <QuestionFormModal isEdit={false} />}

      {/* Edit Question Modal */}
      {showEditModal && <QuestionFormModal isEdit={true} />}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[var(--bg-card)] rounded-lg max-w-md w-full p-6">
            <h2 className="text-xl font-bold mb-4">Delete Question?</h2>
            <p className="text-[var(--text-muted)] mb-6">
              This question will be removed from the active assessment flow. Existing student answers will remain stored for history.
            </p>
            <div className="flex gap-3 justify-end">
              <Button variant="outline" onClick={() => setShowDeleteModal(false)}>
                Cancel
              </Button>
              <Button variant="danger" onClick={confirmDelete}>
                Delete Question
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[var(--bg-card)] rounded-lg max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                <Check className="w-6 h-6 text-green-500" />
              </div>
              <h2 className="text-xl font-bold">Question Added Successfully</h2>
            </div>
            <p className="text-[var(--text-muted)] mb-6">
              The new assessment question has been added to the question bank and can now be used in student profiling.
            </p>
            <div className="flex gap-3 justify-end">
              <Button variant="outline" onClick={() => { setShowSuccessModal(false); handleAddQuestion(); }}>
                Add Another Question
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setShowSuccessModal(false)}>
                Back to Questions
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
