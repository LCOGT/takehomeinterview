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
    var ordinality: Int?
    var size: Double?
    var distance: Double?
    var description: String?
    var photo: UIImage?
    
    
    //MARK: Initialization
    init?(name: String, ordinality: Int?, size: Double?, distance: Double?, description: String?, photo: UIImage?) {
        
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

