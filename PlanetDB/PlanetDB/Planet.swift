//
//  Planet.swift
//  PlanetDB
//
//  Created by Antonio Medrano on 4/27/17.
//  Copyright © 2017 Antonio Medrano. All rights reserved.
//

import UIKit

class Planet {
    
    //MARK: Properties
    var name: String
    var ordinality: String?
    var size: String?
    var distance: String?
    var description: String?
    var photo: UIImage?
    
    
    //MARK: Initialization
    init?(name: String, ordinality: String?, size: String?, distance: String?, description: String?, photo: UIImage?) {
        
        // The name must not be empty
        guard !name.isEmpty else {
            return nil
        }
        
        // Initialize stored properties.
        self.name = name
        self.ordinality = ordinality
        self.size = size
        self.distance = distance
        self.description = description
        self.photo = photo
    }
}

