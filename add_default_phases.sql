-- Insert default phases for any project that doesn't have them
INSERT INTO project_phases (project_id, name, description, status, order_index)
SELECT 
    p.id,
    t.name,
    t.description,
    t.status,
    t.order_index
FROM projects p
CROSS JOIN (
    SELECT 'System Architecture Analysis' as name, 'Analyzing requirements and designing the core system architecture.' as description, 'processing' as status, 0 as order_index
    UNION ALL SELECT 'UI/UX Design & Prototyping', 'Creating high-fidelity mockups and interactive prototypes.', 'pending', 1
    UNION ALL SELECT 'Core Development', 'Implementing backend logic, database structure, and frontend interfaces.', 'pending', 2
    UNION ALL SELECT 'Quality Assurance & Testing', 'Rigorous testing of all features, security audits, and performance tuning.', 'pending', 3
    UNION ALL SELECT 'Production Deployment', 'Deploying to live servers and final handover.', 'pending', 4
) t
WHERE NOT EXISTS (
    SELECT 1 FROM project_phases pp WHERE pp.project_id = p.id
);
